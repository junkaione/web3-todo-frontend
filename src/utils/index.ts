import dayjs from "dayjs";

export const formatDate = (date: number, format = "YYYY-MM-DD HH:mm:ss") => {
  return dayjs.unix(date).format(format);
};
