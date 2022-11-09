const messages = {
  miscError: 'Error in retrieving data.',
};

export const entityMessageCreator = (entity: string) => {
  return {
    getOneSuccess: `Successfully retrieved ${entity}.`,
    getAllSuccess: `Successfully retrieved ${entity}s.`,
    createSuccess: `Successfully created ${entity}(s).`,
    updateSuccess: `Successfully updated ${entity}(s).`,
    deleteSuccess: `Successfully deleted ${entity}(s).`,

    getOneFailed: `Error in retrieving ${entity}.`,
    getAllFailed: `Error in retrieving ${entity}s.`,
    createFailed: `Error in creating ${entity}(s).`,
    updateFailed: `Error in updating ${entity}(s).`,
    deleteFailed: `Error in deleting ${entity}(s).`,
  };
};

export default messages;
