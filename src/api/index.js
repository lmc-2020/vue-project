import fetch from "@/utils/fetch";

export const getUserList = param => fetch("/getUserList/", param);
