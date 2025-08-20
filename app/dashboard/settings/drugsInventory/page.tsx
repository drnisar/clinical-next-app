import {
  DrugsList,
  DrugsStoreInitializer,
  GenericNameInputForm,
  SelectedDrug,
  BrandNamesForm,
} from ".";
import { prisma } from "@/lib/prisma";

const DrugsInventoryPage = async () => {
  const drugs = await prisma.genericName.findMany();
  return (
    <>
      <DrugsStoreInitializer drugs={drugs} />
      <h1>Drugs Inventory</h1>
      <p>Manage your drugs inventory here.</p>
      <GenericNameInputForm />
      <DrugsList />
      <SelectedDrug />
      <BrandNamesForm />
    </>
  );
};

export default DrugsInventoryPage;
