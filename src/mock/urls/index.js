import Mock from "mockjs";

Mock.setup({ timeout: "200-1000" });

const getData = urlData => {
  // mock随机数据
  const Random = Mock.Random;
  let chartDatasskc = [];
  let body = JSON.parse(urlData.body);
  let pageSize = body && body.pageSize ? body.pageSize : 10;

  for (let i = 0; i < pageSize; i++) {
    let newArticleObject = {
      name: Random.cname(), //随机生成中文名字
      qq: /^\d{8,10}$/,
      joinDate: "@date", //随机生成日期时间
      age: Random.natural(20, 30), //随机生成1-5的数字
      addr: "@county(true)"
    };
    chartDatasskc.push(newArticleObject);
  }
  return Mock.mock(chartDatasskc);
};

export default {
  getData
};
