import { MedsTemplate } from "@/generated/prisma";
import { Button, Dialog } from "@radix-ui/themes";
import React, { useState } from "react";
import MedsDisplayEnglish from "./MedsDisplayEnglish";
import Select, { MultiValue, SingleValue } from "react-select";
import { react_select_styles } from "./appConstants";
import { Cross1Icon } from "@radix-ui/react-icons";

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

  const handleOpenChange = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      setSelectedTemplate(null);
    }
  };
  const handleTemplateSelect = () => {
    if (selectedTemplate && onTemplateSelect) {
      onTemplateSelect([selectedTemplate]);
    }
    setIsDialogOpen(false);
    setSelectedTemplate(null);
  };

  // Updated to handle SingleValue properly
  const handleSelectChange = (
    option:
      | SingleValue<{ value: string; label: string }>
      | MultiValue<{ value: string; label: string }>,
    _actionMeta: import("react-select").ActionMeta<{
      value: string;
      label: string;
    }>
  ) => {
    if (Array.isArray(option)) {
      // Should not happen for single select, but handle gracefully
      setSelectedTemplate(null);
    } else if (option) {
      const selected = templates.find(
        (template) =>
          template.meds_template_id ===
          (option as { value: string; label: string }).value
      );
      setSelectedTemplate(selected || null);
    } else {
      // Handle clear case (when option is null)
      setSelectedTemplate(null);
      console.log(_actionMeta);
    }
  };

  return (
    <Dialog.Root open={isDialogOpen} onOpenChange={handleOpenChange}>
      <Dialog.Trigger>
        <Button size="1" variant="soft" color="blue">
          Select Meds Template
        </Button>
      </Dialog.Trigger>
      <Dialog.Content className="min-h-content">
        <Dialog.Close
          aria-label="close"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
          }}
        >
          {/* <Button size="2" variant="ghost" color="gray">
            ✕
          </Button> */}
          <Cross1Icon />
        </Dialog.Close>
        <Dialog.Title>Select Medications Template</Dialog.Title>

        <div className="flex flex-col gap-4">
          <Select
            options={templates.map((template) => ({
              value: template.meds_template_id,
              label: template.template_name,
            }))}
            // onChange={(option) => {
            //   const selected = templates.find(
            //     (template) =>
            //       template.meds_template_id === option?.value || null
            //   );
            //   setSelectedTemplate(selected || null);
            // }}
            onChange={handleSelectChange}
            placeholder="Select a template"
            className="w-full"
            classNamePrefix="react-select"
            styles={react_select_styles}
            isClearable
            isSearchable
          />

          {selectedTemplate && (
            <div style={{ marginTop: 16 }}>
              <MedsDisplayEnglish meds={selectedTemplate.meds} />
            </div>
          )}
          <Button
            size="1"
            variant="soft"
            color="teal"
            onClick={handleTemplateSelect}
            disabled={!selectedTemplate}
          >
            Apply Template
          </Button>
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default MedsTemplateSelectionDialog;
