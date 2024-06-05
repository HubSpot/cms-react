exports.main = async (context) => {
  return {
    statusCode: 200,
    body: {
      message: `SQUAWK: ${context.params.message}`,
    },
  };
};
