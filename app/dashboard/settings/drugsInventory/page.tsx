import { getDrugs } from "@/app/actions/actions";
import { DrugsList, GenericNameInputForm, SelectedDrug } from "./_components";

const DrugsInventoryPage = async () => {
  const drugs = await getDrugs();

  return (
    <>
      <h1>Drugs Inventory</h1>
      <p>Manage your drugs inventory here.</p>
      <GenericNameInputForm />
      <DrugsList drugs={drugs} />
      <SelectedDrug />
    </>
  );
};

export default DrugsInventoryPage;
