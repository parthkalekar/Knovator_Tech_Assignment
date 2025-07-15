const axios = require('axios');
const xml2js = require('xml2js');

const fetchJobsFromXMLFeed = async(url) => {
  const response = await axios.get(url);
  const result = await xml2js.parseStringPromise(response.data, { explicitArray: false });

  const items = result.rss.channel.item;
  return items.map(item => ({
    jobId: item.guid,
    title: item.title,
    company: item['job:company'] || '',
    description: item.description,
    url: item.link,
  }));
}

module.exports = { fetchJobsFromXMLFeed };
