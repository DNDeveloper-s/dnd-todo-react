import moment from "moment";

const useMoment = (props) => {
  const getMonth = (date) => moment(date).month();

  const getDate = (date) => moment(date).date();

  const getYear = (date) => moment(date).year();

  return { getDate, getMonth, getYear, moment };
};

export default useMoment;
