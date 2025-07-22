"use client";
import {
  Button,
  Dialog,
  Text,
  DataList,
  Box,
  Flex,
  Spinner,
} from "@radix-ui/themes";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "react-hot-toast";

interface OTTemplate {
  ot_template_id: string;
  template_name: string;
  procedure: string;
  findings: string;
  operative_details: string;
  closure: string;
  instructions: string;
  created_at: string;
}

interface Props {
  onTemplateSelect: (template: OTTemplate) => void;
}

const TemplateSelectionDialog = ({ onTemplateSelect }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<OTTemplate | null>(
    null
  );

  const {
    data: templates,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["ot-templates"],
    queryFn: async () => {
      const response = await axios.get("/api/templates/ot_templates");
      // Filter out invalid templates and ensure they have IDs
      const validTemplates = (response.data as OTTemplate[]).filter(
        (template) => template && template.ot_template_id != null
      );
      console.log("Fetched templates:", validTemplates); // Debug log
      return validTemplates;
    },
    enabled: open, // Only fetch when dialog is open
  });

  const handleTemplateSelect = (template: OTTemplate) => {
    setSelectedTemplate(template);
  };

  const handleApplyTemplate = () => {
    if (selectedTemplate) {
      onTemplateSelect(selectedTemplate);
      setOpen(false);
      setSelectedTemplate(null);
      toast.success(
        `Template "${selectedTemplate.template_name}" applied successfully`
      );
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <Button variant="soft" color="blue" size="2">
          Load from Template
        </Button>
      </Dialog.Trigger>
      <Dialog.Content
        onPointerDownOutside={(e) => e.preventDefault()}
        style={{ minWidth: "600px", maxHeight: "80vh", overflow: "auto" }}
      >
        <Dialog.Close
          aria-label="close"
          style={{
            position: "absolute",
            top: "12px",
            right: "12px",
          }}
        >
          <Button size="1" variant="ghost" color="gray">
            ✕
          </Button>
        </Dialog.Close>

        <Dialog.Title>Select OT Template</Dialog.Title>
        <Dialog.Description>
          Choose a template to load into the current form. This will overwrite
          existing data.
        </Dialog.Description>
        <Flex justify="end" gap="3" mt="4">
          <Button variant="soft" color="gray" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="solid"
            color="blue"
            disabled={!selectedTemplate}
            onClick={handleApplyTemplate}
          >
            Apply Template
          </Button>
        </Flex>

        {isLoading && (
          <Flex justify="center" align="center" className="py-8">
            <Spinner size="3" />
            <Text ml="2">Loading templates...</Text>
          </Flex>
        )}

        {error && (
          <Box className="py-4">
            <Text color="red">
              Failed to load templates. Please try again.
              <br />
              <Text size="1">Error: {error.message}</Text>
            </Text>
          </Box>
        )}

        {templates && templates.length === 0 && (
          <Box className="py-4">
            <Text color="gray">
              No templates found. Create a template first.
            </Text>
          </Box>
        )}

        {templates && templates.length > 0 && (
          <Box mt="4">
            <Text size="2" weight="bold" className="block mb-3">
              Available Templates ({templates.length})
            </Text>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {templates.map((template) => {
                // Create a fallback key if ID is still missing
                const uniqueKey = template.ot_template_id;

                return (
                  <div
                    key={uniqueKey}
                    className={`p-3 border rounded-md cursor-pointer transition-colors ${
                      selectedTemplate?.ot_template_id ===
                      template.ot_template_id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                    onClick={() => handleTemplateSelect(template)}
                  >
                    <Flex justify="between" align="start" mb="2">
                      <Text size="3" weight="bold">
                        {template.template_name || "Unnamed Template"}
                      </Text>
                      <Text size="1" color="gray">
                        {template.created_at
                          ? new Date(template.created_at).toLocaleDateString()
                          : "No date"}
                      </Text>
                    </Flex>

                    <DataList.Root size="1">
                      <DataList.Item>
                        <DataList.Label>Procedure</DataList.Label>
                        <DataList.Value>
                          {template.procedure?.substring(0, 50) ||
                            "No procedure"}
                          {(template.procedure?.length || 0) > 50 ? "..." : ""}
                        </DataList.Value>
                      </DataList.Item>
                      <DataList.Item>
                        <DataList.Label>Findings</DataList.Label>
                        <DataList.Value>
                          {template.findings?.substring(0, 50) || "No findings"}
                          {(template.findings?.length || 0) > 50 ? "..." : ""}
                        </DataList.Value>
                      </DataList.Item>
                    </DataList.Root>

                    {/* Debug info in development */}
                    {process.env.NODE_ENV === "development" && (
                      <Text size="1" color="gray" className="mt-2 block">
                        ID: {template.ot_template_id || "undefined"}
                      </Text>
                    )}
                  </div>
                );
              })}
            </div>
          </Box>
        )}

        {/* Preview selected template */}
        {selectedTemplate && (
          <Box
            mt="4"
            p="3"
            style={{ backgroundColor: "var(--gray-2)", borderRadius: "6px" }}
          >
            <Text size="3" weight="bold" className="block mb-3">
              Template Preview: {selectedTemplate.template_name}
            </Text>
            <DataList.Root size="2">
              <DataList.Item>
                <DataList.Label>Procedure</DataList.Label>
                <DataList.Value>
                  {selectedTemplate.procedure || "No procedure"}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Findings</DataList.Label>
                <DataList.Value>
                  {selectedTemplate.findings || "No findings"}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Operative Details</DataList.Label>
                <DataList.Value>
                  {selectedTemplate.operative_details || "No details"}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Closure</DataList.Label>
                <DataList.Value>
                  {selectedTemplate.closure || "No closure"}
                </DataList.Value>
              </DataList.Item>
              <DataList.Item>
                <DataList.Label>Instructions</DataList.Label>
                <DataList.Value>
                  {selectedTemplate.instructions || "No instructions"}
                </DataList.Value>
              </DataList.Item>
            </DataList.Root>
          </Box>
        )}
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TemplateSelectionDialog;
