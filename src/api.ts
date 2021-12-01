import AWS, { AWSError } from "aws-sdk";
import { GetItemOutput } from "aws-sdk/clients/dynamodb";
import { EdgesToSaveType } from "./components/ExportModalComponent";

type CallbackType = (err: AWSError, data: GetItemOutput) => void;

const docClient = new AWS.DynamoDB.DocumentClient({
  region: "us-east-2",
  endpoint: "https://dynamodb.us-east-2.amazonaws.com/",
  accessKeyId: process.env.REACT_APP_ACCESS_KEY,
  secretAccessKey: process.env.REACT_APP_SECRET_KEY,
});

const TableName = "bom-demonstration";

export const getEdges = async (id: string, callback?: CallbackType) => {
  const params = { TableName, Key: { id } };
  await docClient.get(params, callback);
};

export const createEdges = async (
  id: string,
  edges: EdgesToSaveType,
  callback?: CallbackType
) => {
  const params = { TableName, Item: { id, edges } };
  await docClient.put(params, callback);
};

export const updateEdges = async (
  id: string,
  edges: EdgesToSaveType,
  callback?: CallbackType
) => {
  const params = {
    TableName,
    Key: { id },
    UpdateExpression: "set edges = :e",
    ExpressionAttributeValues: { ":e": edges },
    ReturnValues: "UPDATED_NEW",
  };
  await docClient.update(params, callback);
};
