export const parseTokenDuration = (): number => {
  const tokenDuration = process.env.JWT_DURATION;
  const tokenExpiration = tokenDuration.split("d")[0];
  const tokenExpirationNumber = Number(tokenExpiration);

  return tokenExpirationNumber;
};
