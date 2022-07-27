// ALL COUNTRY NAMES WITH THEIR ISO CODE
let country_list = [
    { name: 'Spain', code: 'ES' },
    { name: 'Italy', code: 'IT' },
    { name: 'France', code: 'FR' },
    { name: 'Germany', code: 'DE' },
    { name: 'UK', code: 'GB' },
    { name: 'Turkey', code: 'TR' },
    { name: 'Iran', code: 'IR' },
    { name: 'Russia', code: 'RU' },
    { name: 'Belgium', code: 'BE' },
    { name: 'Brazil', code: 'BR' },
    { name: 'Canada', code: 'CA' },
    { name: 'Netherlands', code: 'NL' },
    { name: 'Switzerland', code: 'CH' },
    { name: 'Portugal', code: 'PT' },
    { name: 'India', code: 'IN' },
    { name: 'Ireland', code: 'IE' },
    { name: 'Austria', code: 'AT' },
    { name: 'Peru', code: 'PE' },
    { name: 'Sweden', code: 'SE' },
    { name: 'Japan', code: 'JP' },
    { name: 'Chile', code: 'CL' },
    { name: 'Saudi Arabia', code: 'SA' },
    { name: 'Poland', code: 'PL' },
    // { name: 'Ecuador', code: 'EC' },
    { name: 'Romania', code: 'RO' },
    { name: 'Pakistan', code: 'PK' },
    { name: 'Mexico', code: 'MX' },
    { name: 'Denmark', code: 'DK' },
    { name: 'Norway', code: 'NO' },
    // { name: 'Czechia', code: 'CZ' },
    { name: 'Australia', code: 'AU' },
    { name: 'Singapore', code: 'SG' },
    { name: 'Indonesia', code: 'ID' },
    { name: 'Serbia', code: 'RS' },
    { name: 'Philippines', code: 'PH' },
    { name: 'Ukraine', code: 'UA' },
    { name: 'Qatar', code: 'QA' },
    { name: 'Malaysia', code: 'MY' },
    { name: 'Belarus', code: 'BY' },
    { name: 'Finland', code: 'FI' },
    { name: 'Colombia', code: 'CO' },
    { name: 'South Africa', code: 'ZA' },
    { name: 'Egypt', code: 'EG' },
    { name: 'Argentina', code: 'AR' },
    { name: 'Morocco', code: 'MA' },
    { name: 'Thailand', code: 'TH' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'Bangladesh', code: 'BD' },
    { name: 'Greece', code: 'GR' },
    { name: 'Hungary', code: 'HU' },
    { name: 'Kuwait', code: 'KW' },
    { name: 'Bahrain', code: 'BH' },
    { name: 'Iceland', code: 'IS' },
    { name: 'Uzbekistan', code: 'UZ' },
    { name: 'Iraq', code: 'IQ' },
    { name: 'New Zealand', code: 'NZ' },
    { name: 'Azerbaijan', code: 'AZ' },
    { name: 'Slovenia', code: 'SI' },
    { name: 'Armenia', code: 'AM' },
    { name: 'Oman', code: 'OM' },
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Bulgaria', code: 'BG' },
    { name: 'Ghana', code: 'GH' },
    { name: 'Nigeria', code: 'NG' },
    { name: 'Palestine', code: 'PS' },
    { name: 'Malta', code: 'MT' },
    { name: 'Taiwan', code: 'TW' },
    { name: 'Jordan', code: 'JO' },
    { name: 'Georgia', code: 'GE' },
    { name: 'Sri Lanka', code: 'LK' },
    { name: 'Kenya', code: 'KE' },
    { name: 'Vietnam', code: 'VN' },
    { name: 'Jamaica', code: 'JM' },
    { name: 'Tanzania', code: 'TZ' },
    { name: 'Rwanda', code: 'RW' },
    { name: 'Brunei', code: 'BN' },
    { name: 'Somalia', code: 'SO' },
    { name: 'Cambodia', code: 'KH' },
    { name: 'Trinidad and Tobago', code: 'TT' },
    { name: 'Myanmar', code: 'MM' },
    { name: 'Ethiopia', code: 'ET' },
    { name: 'Monaco', code: 'MC' },
    { name: 'Togo', code: 'TG' },
    { name: 'Sudan', code: 'SD' },
    { name: 'Guyana', code: 'GY' },
    { name: 'Zambia', code: 'ZM' },
    { name: 'Bahamas', code: 'BS' },
    { name: 'Uganda', code: 'UG' },
    { name: 'Maldives', code: 'MV' },
    { name: 'Syria', code: 'SY' },
    { name: 'Nepal', code: 'NP' },
    { name: 'Zimbabwe', code: 'ZW' },
    { name: 'Fiji', code: 'FJ' },
    { name: 'Namibia', code: 'NA' },
    { name: 'Papua New Guinea', code: 'PG' },
    { name: 'Bhutan', code: 'BT' },
    { name: 'Yemen', code: 'YE' },
    { name: 'China', code: 'CN' }
];

// SELECT SEARCH COUNTRY ELEMENTS
const search_country_element = document.querySelector(".search-country");
const country_list_element = document.querySelector(".country-list");
const chang_country_btn = document.querySelector(".change-country");
const close_list_btn = document.querySelector(".close");
const input = document.getElementById('search-input')

// CREATE TE COUNTRY LIST
function createCountryList(){
    const num_countries = country_list.length;

    let i = 0, ul_list_id;

    country_list.forEach( (country, index) => {
        if( index % Math.ceil(num_countries/num_of_ul_lists) == 0){
            ul_list_id = `list-${i}`;
            country_list_element.innerHTML += `<ul id='${ul_list_id}'></ul>`;
            i++;
        }

        document.getElementById(`${ul_list_id}`).innerHTML += `
            <li onclick="fetchData('${country.name}')" id="${country.name}">
            ${country.name}
            </li>
        `;
    })
}

let num_of_ul_lists = 2;
createCountryList();

// SHOW/HIDE THE COUTRY LIST ON CLICK EVENT
chang_country_btn.addEventListener("click", function(){
    input.value = "";
    resetCountryList();
    search_country_element.classList.toggle("hide");
    search_country_element.classList.add("fadeIn");
});

close_list_btn.addEventListener("click", function(){
    search_country_element.classList.toggle("hide");
});

country_list_element.addEventListener("click", function(){
    search_country_element.classList.toggle("hide");
});

// COUNTRY FILTER
/* input event fires up whenever the value of the input changes */
input.addEventListener("input", function(){
    let value = input.value.toUpperCase();

    country_list.forEach( country => {
        if( country.name.toUpperCase().startsWith(value)){
            document.getElementById(country.name).classList.remove("hide");
        }else{
            document.getElementById(country.name).classList.add("hide");
        }
    })
})

// RESET COUNTRY LIST (SHOW ALL THE COUNTRIES )
function resetCountryList(){
    country_list.forEach( country => {
        document.getElementById(country.name).classList.remove("hide");
    })
}