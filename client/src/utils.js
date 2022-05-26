const mS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  
  export const getFormattedDate = (
    dateString,
    withTime = false,
    digits = false
  ) => {
    // This method works with unix time stamp (in ms ) as well
    if (!dateString) return "No date";
    let date = dateString;
    if (typeof date === "string" && !Number.isNaN(Number(date))) {
      date = Number(date);
    }
    const d = new Date(date);
    if (Number.isNaN(d.valueOf())) return "Invalid date";
  
    if (withTime) {
      return `${d.getDate()} ${mS[d.getMonth()]} ${d.getFullYear()} ${withTime &&
        d.toLocaleString("en-IN", {
          hour12: true,
          hour: "2-digit",
          minute: "2-digit"
        })}`;
    }
  
    if (digits) {
      const dd = d.getDate();
      const mm = d.getMonth() + 1;
      const yyyy = d.getFullYear();
      let dds = `${dd}`;
      let mms = `${mm}`;
      if (dd < 10) {
        dds = `0${dd}`;
      }
      if (mm < 10) {
        mms = `0${mm}`;
      }
      return `${dds}/${mms}/${yyyy}`;
    }
  
    return `${d.getDate()} ${mS[d.getMonth()]} ${d.getFullYear()}`;
  };