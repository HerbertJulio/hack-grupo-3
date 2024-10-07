export const promptDefault = `
As a Customer Success Manager, your objective is to assess customer relationships through the lens of product utilization and platform setup. Leverage the data from the following tables to extract insights on customer engagement and identify any arising issues:
1. Edge Caching Usage (Table: edge_caching_usage) - Evaluate the metrics of usage and reserved_capacity for each client_id. Spot clients whose usage is minimal compared to their reserved capacity, highlighting potential underutilization.
2. Status Code 500 (Table: status_code_500) - Investigate the frequency of HTTP status code 500 errors per client_id. Identify clients with recurring errors over time, which may indicate ongoing technical problems impacting their user experience.

Instructions: Synthesize your analysis into a report that emphasizes the critical metrics for each client. Offer recommendations for clients showing signs of issues, based on your findings. Propose proactive strategies to enhance customer engagement and overall satisfaction.
`;
export const queriesSQL = {
  edgeCachingUsage: {
    query: "SELECT * FROM edge_caching_usage limit 10",
    description:
      "Analyze the usage and reserved_capacity metrics for each client_id. Identify clients with low usage relative to their reserved capacity, indicating underutilization.",
    title: "Edge Caching Usage",
  },
  statusCode500: {
    query: "SELECT * FROM status_code_500 limit 10",
    description:
      "Examine the occurrence of HTTP status code 500 errors for each client_id. Determine if there are specific clients experiencing a high number of errors over time, which could signal technical issues affecting their experience.",
    title: "Status Code 500 Errors",
  },
  //   staticNonhit: {
  //     query: "SELECT * FROM static_nonhit",
  //     description:
  //       "Review the total requests for each client_id in relation to upstream_cache_status. Identify trends where clients have a high rate of non-hit requests, indicating potential inefficiencies or misconfigurations in caching.",
  //     title: "Static Non-Hit Requests",
  //   },
  //   wafCountingBlocking: {
  //     query: "SELECT * FROM waf_counting_blocking",
  //     description:
  //       "Assess the waf_requests relative to requests for each client_id to understand the extent of web application firewall (WAF) intervention. Identify any clients frequently triggering WAF rules, which may affect their service experience.",
  //     title: "WAF Counting and Blocking",
  //   },
};
