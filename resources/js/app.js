
// SELECT ALL ELEMENTS
const country_name_element = document.querySelector(".country .name");
const total_cases_element = document.querySelector(".total-cases .value");
const new_cases_element = document.querySelector(".total-cases .new-value1");
const deaths_element = document.querySelector(".deaths .value");
const new_deaths_element = document.querySelector(".deaths .new-value3");

const ctx = document.getElementById("axes_line_chart").getContext("2d");

// APP VARIABLES
let app_data = [],
  cases_list = [],
  // recovered_list = [],
  deaths_list = [],
  deaths = [],
  formatedDates = [];

// GET USERS COUNTRY CODE
fetch("https://api.ipgeolocation.io/ipgeo?apiKey=14c7928d2aef416287e034ee91cd360d")
  .then((res) => {
    return res.json();
  })    
  .then((data) => {
    let country_code = data.country_code2;
    let user_country;
    country_list.forEach((country) => {
      if (country.code == country_code) {
        user_country = country.name;
      }
    });
    fetchData(user_country);
  });

/* ---------------------------------------------- */
/*                     FETCH API                  */
/* ---------------------------------------------- */
function fetchData(country) {
  user_country = country;
  country_name_element.innerHTML = "Loading...";

  (cases_list = []),
  // (recovered_list = []),
    (deaths_list = []),
    (dates = []),
    (formatedDates = []);

  var requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const api_fetch = async (country) => {
    await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/confirmed",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //let f1=0;
        data.forEach((entry) => {
          dates.push(entry.Date);
                cases_list.push(entry.Cases);
              // if(entry.Date=="2021-08-04T00:00:00Z")
              //   f1=1;
              // if(!f1)
              // {
              //   dates.push(entry.Date);
              //   cases_list.push(entry.Cases);
              // }
        });
      });

    await fetch(
      "https://api.covid19api.com/total/country/" + country + "/status/deaths",
      requestOptions
    )
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        //let f1=0;
        data.forEach((entry) => {
          deaths_list.push(entry.Cases);
            // if(entry.Date=="2021-08-04T00:00:00Z")
            //   f1=1;
            // if(!f1)
            //   deaths_list.push(entry.Cases);
        });
      });

    updateUI();
  };

  api_fetch(country);
}

// UPDATE UI FUNCTION
function updateUI() {
  updateStats();
  axesLinearChart();
}

function updateStats() {
  const total_cases = cases_list[cases_list.length - 1];
  const new_confirmed_cases = total_cases - cases_list[cases_list.length - 2];

  const total_deaths = deaths_list[deaths_list.length - 1];
  const new_deaths_cases = total_deaths - deaths_list[deaths_list.length - 2];

  country_name_element.innerHTML = user_country;
  total_cases_element.innerHTML = total_cases;
  new_cases_element.innerHTML = `+${new_confirmed_cases}`;
  deaths_element.innerHTML = total_deaths;
  new_deaths_element.innerHTML = `+${new_deaths_cases}`;

  // format dates
  dates.forEach((date) => {
      formatedDates.push(formatDate(date));
  });
}

// UPDATE CHART
let my_chart;
function axesLinearChart() {
  if (my_chart) {
    my_chart.destroy();
  }

  my_chart = new Chart(ctx, {
    type:"line",
    data: {
      datasets: [
        {
          label: "Cases",
          data: cases_list,
          fill: false,
          borderColor: "#40E0D0",
          // backgroundColor: "#FFF",
          borderWidth: 2,
          
        },
        {
          label: "Deaths",
          data: deaths_list,
          fill: false,
          borderColor: "#FF0000",
          // backgroundColor: "#FF0000",
          borderWidth: 2,
        },
      ],
      labels: formatedDates,
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
    },
  });
}

// FORMAT DATES
const monthsNames = [
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
  "Dec",
];

function formatDate(dateString) {
  let date = new Date(dateString);

  return `${date.getDate()} ${monthsNames[date.getMonth()]} ${date.getYear()-100}`;
}
