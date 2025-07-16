import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function fixExaminationData() {
  try {
    console.log("Starting examination data cleanup...");

    // Get all registrations with examination data
    const registrations = (await prisma.$queryRaw`
      SELECT registration_id, examination 
      FROM registration 
      WHERE examination IS NOT NULL
    `) as any[];

    console.log(`Found ${registrations.length} registrations to check`);

    let fixedCount = 0;

    for (const registration of registrations) {
      try {
        // Check if examination is JSON string
        if (
          typeof registration.examination === "string" &&
          (registration.examination.startsWith("[") ||
            registration.examination.startsWith("{"))
        ) {
          console.log(
            `Processing registration ${registration.registration_id}`
          );
          console.log(`Current examination data: ${registration.examination}`);

          // Parse the JSON to validate it
          const parsedExamination = JSON.parse(registration.examination);

          let examinationString = "";

          if (Array.isArray(parsedExamination)) {
            // Convert JSON array to simple string
            examinationString = parsedExamination
              .map((item: any) => {
                if (
                  typeof item === "object" &&
                  item.examination &&
                  item.findings
                ) {
                  return `${item.examination}: ${item.findings}`;
                } else if (typeof item === "string") {
                  return item;
                } else {
                  return JSON.stringify(item);
                }
              })
              .join("; ");
          } else if (typeof parsedExamination === "object") {
            // Convert object to string
            examinationString = Object.entries(parsedExamination)
              .map(([key, value]) => `${key}: ${value}`)
              .join("; ");
          } else {
            examinationString = String(parsedExamination);
          }

          await prisma.registration.update({
            where: { registration_id: registration.registration_id },
            data: { examination: examinationString },
          });

          console.log(`✅ Fixed registration ${registration.registration_id}`);
          console.log(`New examination data: ${examinationString}`);
          fixedCount++;
        }
      } catch (error) {
        console.error(
          `❌ Error processing registration ${registration.registration_id}:`,
          error
        );
      }
    }

    console.log(`\n🎉 Examination data cleanup completed!`);
    console.log(
      `📊 Fixed ${fixedCount} out of ${registrations.length} registrations`
    );
  } catch (error) {
    console.error("💥 Error during cleanup:", error);
  } finally {
    await prisma.$disconnect();
  }
}

// Run the cleanup
if (require.main === module) {
  fixExaminationData()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

export default fixExaminationData;
