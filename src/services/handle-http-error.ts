import request from 'axios';
import { toast } from 'react-toastify';
import { HttpCode } from '../const';
import { ErrorType } from '../types/error';

export const handleHttpError  = (error: ErrorType): void => {

  if (!request.isAxiosError(error)) {
    return ;
  }

  const { response } = error;

  if (response) {
    switch (response.status) {
      case HttpCode.BadRequest:
        toast.error(response.data.error);
        break;
      case HttpCode.Unauthorized:
        toast.warning(response.data.error);
        break;
      case HttpCode.NotFound:
        toast.error(response.data.error);
        break;
    }
  } else {
    toast.error('Error! Lost connection!');
  }
};
