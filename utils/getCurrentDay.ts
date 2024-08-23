import { Days } from "../enums/enums";

const getCurrentDay = (): Days => {
    const daysOfWeek = [
      Days.Sunday, // 0
      Days.Monday, // 1
      Days.Tuesday, // 2
      Days.Wednesday, // 3
      Days.Thursday, // 4
      Days.Friday, // 5
      Days.Saturday // 6
    ];

    const currentDate = new Date();
    const dayIndex = currentDate.getDay();

    return daysOfWeek[dayIndex] || Days.Unknown;
};  

export default getCurrentDay;