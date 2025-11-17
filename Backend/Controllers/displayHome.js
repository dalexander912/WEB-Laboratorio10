//  GET: /
export const displayHome = (request, response) => {
  response.status(200).json({
    status: true,
    info: 'Node.js, Express, and Postgres API' 
  });
};