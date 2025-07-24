import { MedsTemplate } from "@/generated/prisma";
import { Button, Dialog } from "@radix-ui/themes";
import React, { useState } from "react";
import MedsDisplayEnglish from "./MedsDisplayEnglish";

interface Props {
  templates: MedsTemplate[];
  onTemplateSelect?: (template: MedsTemplate[]) => void;
}

const MedsTemplateSelectionDialog = ({
  templates,
  onTemplateSelect,
}: Props) => {
  const [selectedTemplate, setSelectedTemplate] = useState<MedsTemplate | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const handleTemplateSelect = () => {
    if (selectedTemplate && onTemplateSelect) {
      onTemplateSelect([selectedTemplate]);
    }
    setIsDialogOpen(false);
  };
  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <Dialog.Trigger>
        <Button size="1" variant="soft" color="blue">
          Select Meds Template
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Close
          aria-label="close"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
          }}
        >
          <Button size="2" variant="ghost" color="gray">
            ✕
          </Button>
        </Dialog.Close>
        <Dialog.Title>Select Medications Template</Dialog.Title>

        <label
          htmlFor="template_select"
          style={{ display: "block", marginBottom: 4 }}
        >
          Choose a template
        </label>
        <select
          id="template_select"
          name="template_select"
          onChange={(e) => {
            setSelectedTemplate(
              templates.filter(
                (template) => template.meds_template_id === e.target.value
              )[0]
            );
          }}
        >
          <option value="">Select a template</option>
          {templates.map((template) => (
            <option
              key={template.meds_template_id}
              value={template.meds_template_id}
            >
              {template.template_name}
            </option>
          ))}
        </select>
        {selectedTemplate && (
          <div style={{ marginTop: 16 }}>
            <MedsDisplayEnglish meds={selectedTemplate.meds} />
          </div>
        )}
        <Button onClick={handleTemplateSelect} disabled={!selectedTemplate}>
          Apply Template
        </Button>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default MedsTemplateSelectionDialog;
