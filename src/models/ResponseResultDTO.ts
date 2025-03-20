import { AxiosResponse } from "axios";

export default class ResponseResultDTO<T> {
  private message: string;
  private errorCode: string | null;
  private success: boolean;
  private content: T;

  private constructor(success: boolean, content: T, errorCode: string, message: string) {

    this.success = success;
    this.content = content;
    this.errorCode = errorCode;
    this.message = message;
  }

  public static fromAxiosResponse<T>(response: AxiosResponse<ResponseResultDTO<T>>) {
    return new ResponseResultDTO<T>(
      response.data.success,
      response.data.content,
      response.data.errorCode || '',
      response.data.message
    );
  }

  public static noResponseError<T>() {
    return new ResponseResultDTO<T>(false, null as any, 'NO_RESPONSE_RECEIVED', 'An internal error occurred, please try again later');
  }

  public static requestError<T>() {
    return new ResponseResultDTO<T>(false, null as any, 'REQUEST_ERROR', 'An internal error occurred, please try again later');
  }

  public getContentOrThrowError(): T {
    if (this.success) {
      return this.content;
    } else {
      throw new Error(this.message);
    }
  }
}
