export default {
  formatDate: function (d) {
    function pad(n, z) {
      z = z || 2;
      return ("00" + n).slice(-z);
    }
    var dd = d.getDate();
    // dd = pad(dd)
    var mm = d.getMonth() + 1; // Months are zero based
    // mm = pad(mm)
    var yyyy = d.getFullYear();
    // var timeStamp = d.getTime();  // Number of ms since Jan 1, 1970
    var currentTime = d.toLocaleTimeString("en-US", {
      hour12: false,
    }); // "12:35 PM", for instance
    return yyyy + "-" + pad(mm) + "-" + pad(dd) + " " + currentTime;
  },
};
