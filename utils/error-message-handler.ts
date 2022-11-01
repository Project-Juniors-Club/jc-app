import messages from './api-messages';

export type EntityErrorMessage = {
  getOneFailed: string;
  getAllFailed: string;
  createFailed: string;
  updateFailed: string;
  deleteFailed: string;
};

export type ErrorMessageHandlerParams = {
  httpMethod?: string;
  isSingleEntity?: boolean;
};

export const errorMessageHandler = (errorMessageParams: ErrorMessageHandlerParams, entityMessageObj: EntityErrorMessage) => {
  if (errorMessageParams.isSingleEntity) {
    switch (errorMessageParams.httpMethod) {
      case 'GET':
        return entityMessageObj.getOneFailed;
      case 'PUT':
        return entityMessageObj.updateFailed;
      case 'DELETE':
        return entityMessageObj.deleteFailed;
    }
  } else {
    switch (errorMessageParams.httpMethod) {
      case 'GET':
        return entityMessageObj.getAllFailed;
      case 'POST':
        return entityMessageObj.createFailed;
      case 'PUT':
        return entityMessageObj.updateFailed;
      case 'DELETE':
        return entityMessageObj.deleteFailed;
    }
  }

  return messages.misc;
};
