import Mock from "mockjs";
import urls from "./urls";

Mock.mock("/api/getUserList/", "get", urls.getData);
