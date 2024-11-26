import { graphql } from "@/graphql/__generated__";
import client from "@/graphql/apollo-client";

const AUTH = graphql(`
  mutation InitiateEmailAuthentication($email: String!) {
    initiateEmailAuthentication(email: $email)
  }
`);

export const logIn = async (email: string): Promise<string> => {
  const result = await client.mutate({
    mutation: AUTH,
    variables: { email },
    errorPolicy: 'all',
  });
  if (result.errors && result.errors.length > 0) {
    throw new Error(result.errors[0].message);
  }
  if (!result.data?.initiateEmailAuthentication) {
    throw new Error("Failed to initiate authentication");
  }
  return result.data.initiateEmailAuthentication
}

const VALIDATE_AUTH = graphql(`
  mutation ValidateEmailAuthentication($token: String! $code: String!) {
    validateEmailAuthentication(token: $token, code: $code) {
      ... on SuccessfulAuthentication {
        sessionToken
        account {
          email
          username
        }
      }
    }
  }
`);

export const validateLogIn = async (token: string, code: string): Promise<string | true> => {
  const result = await client.mutate({
    mutation: VALIDATE_AUTH,
    variables: { token, code },
  });
  const response = result.data?.validateEmailAuthentication;

  if (!response) {
    throw new Error("Failed to validate authentication");
  }

  if (response.__typename === "EmptyResponse") {
    return true;
  }

  // check if the response is a successful authentication
  if (response.__typename !== "SuccessfulAuthentication") {
    throw new Error("Failed to validate authentication");
  }

  return response.sessionToken
}

const COMPLETE_ACCOUNT = graphql(`
  mutation CompleteAccountCreation($token: String! $code: String! $username: String! $deviceName: String!) {
    completeAccountCreation(token: $token, code: $code, username: $username, deviceName: $deviceName)
  }
`);

export const completeAccountCreate = async (token: string, code: string, username: string, deviceName: string): Promise<string> => {
  const result = await client.mutate({
    mutation: COMPLETE_ACCOUNT,
    variables: { token, code, username, deviceName },
  });
  const session = result.data?.completeAccountCreation;
  if (!session) {
    throw new Error("Failed to complete account creation");
  }
  return session;
}
