const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const axios = require('axios');
const port = 3000;

app.use(express.json());
app.use(cookieParser());

app.get('/', async (req, res) => {
  res.send('Hello World!');
});

app.get('/getcode/:code', async (req, res) => {
  try {
    const url = 'https://www.tistory.com/oauth/access_token?';
    const client_id = '7ef1b75d5607a9e5955874efe0ab98b5';
    const client_secret = '7ef1b75d5607a9e5955874efe0ab98b5a73f48f1d27d56a29cb0ef1975eff48dba56df70';
    const redirect_uri = 'http://tistory.com';
    const code = req.params.code;
    const grant_type = 'authorization_code';
    const request_url = `${url}client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}&code=${code}&grant_type=${grant_type}`;
    // GET 요청보내기
    const response = await axios.get(request_url);
    return res.status(200).json({ data: response.data });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ errorMessage: err.message });
  }
});

app.post('/', async (req, res) => {
  try {
    const url = 'https://www.tistory.com/apis/post/write?';
    const { access_token } = req.body;
    const output_type = 'json';
    const blogName = 'allaclass';
    const title = 'Posting Test';
    const content = '<h1>Hello, World!</h1>';
    const visibility = 0;
    const category_id = 0;
    const published = Date.now();
    const request_url = `${url}access_token=${access_token}&output=${output_type}&blogName=${blogName}&title=${title}&content=${content}&visibility=${visibility}&category=${category_id}&pulished=${published}`;
    // POST 요청보내기
    const response = await axios.post(request_url);
    return res.status(200).json({ data: response.data });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ errorMessage: err.message })
  }
})

app.post('/test', async (req, res) => {
  try {
    const { access_token } = req.body;
    return res.status(200).json({ data: access_token });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ errorMessage: err.message })
  }
})

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});