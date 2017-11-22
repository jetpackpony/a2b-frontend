export default () => ({
  "data": [
    {
      "type": "itineraries",
      "id": "8",
      "attributes": {
        "from-city": "Bangkok, Thailand",
        "to-city": "Phnom Penh, Cambodia",
        "price": 10,
        "duration": 4
      },
      "relationships": {
        "routes": {
          "data": [
            {
              "type": "routes",
              "id": "8"
            }
          ]
        }
      }
    },
    {
      "type": "itineraries",
      "id": "9",
      "attributes": {
        "from-city": "Bangkok, Thailand",
        "to-city": "Phnom Penh, Cambodia",
        "price": 15,
        "duration": 8
      },
      "relationships": {
        "routes": {
          "data": [
            {
              "type": "routes",
              "id": "9"
            }
          ]
        }
      }
    },
    {
      "type": "itineraries",
      "id": "10",
      "attributes": {
        "from-city": "Bangkok, Thailand",
        "to-city": "Phnom Penh, Cambodia",
        "price": 45,
        "duration": 12
      },
      "relationships": {
        "routes": {
          "data": [
            {
              "type": "routes",
              "id": "10"
            }
          ]
        }
      }
    },
    {
      "type": "itineraries",
      "id": "11-12",
      "attributes": {
        "from-city": "Bangkok, Thailand",
        "to-city": "Phnom Penh, Cambodia",
        "price": 40,
        "duration": 13.25
      },
      "relationships": {
        "routes": {
          "data": [
            {
              "type": "routes",
              "id": "11"
            },
            {
              "type": "routes",
              "id": "12"
            }
          ]
        }
      }
    },
    {
      "type": "itineraries",
      "id": "13-14-15",
      "attributes": {
        "from-city": "Bangkok, Thailand",
        "to-city": "Phnom Penh, Cambodia",
        "price": 33,
        "duration": 12.25
      },
      "relationships": {
        "routes": {
          "data": [
            {
              "type": "routes",
              "id": "13"
            },
            {
              "type": "routes",
              "id": "14"
            },
            {
              "type": "routes",
              "id": "15"
            }
          ]
        }
      }
    }
  ],
  "included": [
    {
      "type": "routes",
      "id": "8",
      "attributes": {
        "from-address": "5 Soi Sukhumvit 93, 10260, Bangkok, Thailand",
        "from-city": "Bangkok, Thailand",
        "from-lat": 13.698861464214666,
        "from-lng": 100.60481071472168,
        "to-address": "St 110E, Phnom Penh, Cambodia",
        "to-city": "Phnom Penh, Cambodia",
        "to-lat": 11.56050982837746,
        "to-lng": 104.86544609069824,
        "organization": "Buva Bus",
        "company-mail": "support@buvabus.com",
        "company-phone": "098 888 999",
        "company-site": "http://www.buvabus.com/",
        "company-description": "New service that has been available since the end of September, 2016, operated by the same company as (the much maligned) Virak Buntham buses.",
    "transport-type": "Bus",
    "duration": 4,
    "price": 10,
    "timetable": "7:00 AM, 9:00 PM",
        "description": "Large comfortable bus with tea/coffee and cookies available throughout the trip."
      }
    },
    {
      "type": "routes",
      "id": "9",
      "attributes": {
        "from-address": "Soi Nawamin 72, 10230, Bangkok, Thailand",
        "from-city": "Bangkok, Thailand",
        "from-lat": 13.812743349919053,
        "from-lng": 100.65399169921875,
        "to-address": "Chamkar Doung Street (217), Phnom Penh, Cambodia",
        "to-city": "Phnom Penh, Cambodia",
        "to-lat": 11.488856435417953,
        "to-lng": 104.89471435546875,
        "organization": "Buva Bus",
        "company-mail": "support@buvabus.com",
        "company-phone": "098 888 999",
        "company-site": "http://www.buvabus.com/",
        "company-description": "New service that has been available since the end of September, 2016, operated by the same company as (the much maligned) Virak Buntham buses.",
        "transport-type": "Bus",
        "duration": 8,
        "price": 15,
        "timetable": "11:00 AM",
        "description": "A mini-bus with air conditioning and a TV. Makes 2 stops at supermarkets along the way."
      }
    },
    {
      "type": "routes",
      "id": "10",
      "attributes": {
        "from-address": "24/6 Thanon Borommaratchachonnani, 10170, Bangkok, Thailand",
        "from-city": "Bangkok, Thailand",
        "from-lat": 13.780401863217657,
        "from-lng": 100.42259216308594,
        "to-address": "Russian Federation Blvd. (110), Phnom Penh, Cambodia",
        "to-city": "Phnom Penh, Cambodia",
        "to-lat": 11.57199831972309,
        "to-lng": 104.90664482116699,
        "organization": "Siam Train Company",
        "company-mail": "info@siamtrain.th",
        "company-phone": "+66 333 555 7788",
        "company-site": "http://siamtrain.th",
        "company-description": "Trains are comfortable and always on time.",
        "transport-type": "Train",
        "duration": 12,
        "price": 45,
        "timetable": "6:00 AM every Tuesday and Friday",
        "description": "Comfortable train with all the usual train stuff and things."
      }
    },
    {
      "type": "routes",
      "id": "11",
      "attributes": {
        "from-address": "28 Sukhumvit Rd, 10270, Bangkok, Thailand",
        "from-city": "Bangkok, Thailand",
        "from-lat": 13.612621315962613,
        "from-lng": 100.59356689453125,
        "to-address": "21 Tomnub Rolork Road, Krong Preah Sihanouk, Cambodia",
        "to-city": "Krong Preah Sihanouk, Cambodia",
        "to-lat": 10.646436946677118,
        "to-lng": 103.51318359375,
        "organization": "Speed Ferry Thailand",
        "company-mail": "",
        "company-phone": "+66 88 555 880",
        "company-site": "http://speedferrythailand.com/",
        "company-description": "One of the fastest and best boat service in Thailand.",
        "transport-type": "Ferry",
        "duration": 5.25,
        "price": 15,
        "timetable": "7:00 AM, 9:00 PM",
        "description": "A fast ferry, departs and arrives always on time."
      }
    },
    {
      "type": "routes",
      "id": "12",
      "attributes": {
        "from-address": "Street 705, Krong Preah Sihanouk, Cambodia",
        "from-city": "Krong Preah Sihanouk, Cambodia",
        "from-lat": 10.641207003806528,
        "from-lng": 103.51661682128906,
        "to-address": "Preah Norodom Blvd (41), Phnom Penh, Cambodia",
        "to-city": "Phnom Penh, Cambodia",
        "to-lat": 11.574216080310618,
        "to-lng": 104.92321014404297,
        "organization": "Buva Bus",
        "company-mail": "support@buvabus.com",
        "company-phone": "098 888 999",
        "company-site": "http://www.buvabus.com/",
        "company-description": "New service that has been available since the end of September, 2016, operated by the same company as (the much maligned) Virak Buntham buses.",
        "transport-type": "Bus",
        "duration": 8,
        "price": 25,
        "timetable": "11:00 AM",
        "description": "A mini-bus with air conditioning and a TV. Makes 2 stops at supermarkets along the way."
      }
    },
    {
      "type": "routes",
      "id": "13",
      "attributes": {
        "from-address": "20191217 Ramkhamhaeng Rd, 10240, Bangkok, Thailand",
        "from-city": "Bangkok, Thailand",
        "from-lat": 13.763395779624457,
        "from-lng": 100.64849853515625,
        "to-address": "NR5, Krong Poi Pet, Cambodia",
        "to-city": "Krong Poi Pet, Cambodia",
        "to-lat": 13.654118940712456,
        "to-lng": 102.56325244903564,
        "organization": "Siam Train Company",
        "company-mail": "info@siamtrain.th",
        "company-phone": "+66 333 555 7788",
        "company-site": "http://siamtrain.th",
        "company-description": "Trains are comfortable and always on time.",
        "transport-type": "Train",
        "duration": 5,
        "price": 10,
        "timetable": "6:00 AM, 8:00 PM",
        "description": "Comfortable train with all the usual train stuff and things."
      }
    },
    {
      "type": "routes",
      "id": "14",
      "attributes": {
        "from-address": "NR5, Krong Poi Pet, Cambodia",
        "from-city": "Krong Poi Pet, Cambodia",
        "from-lat": 13.652242321168496,
        "from-lng": 102.56411075592041,
        "to-address": "Charles De Gaulle, Krong Siem Reap, Cambodia",
        "to-city": "Krong Siem Reap, Cambodia",
        "to-lat": 13.406652504442333,
        "to-lng": 103.86646270751953,
        "organization": "Buva Bus",
        "company-mail": "support@buvabus.com",
        "company-phone": "098 888 999",
        "company-site": "http://www.buvabus.com/",
        "company-description": "New service that has been available since the end of September, 2016, operated by the same company as (the much maligned) Virak Buntham buses.",
        "transport-type": "Bus",
        "duration": 1.75,
        "price": 3,
        "timetable": "From 6 AM to 9 PM, every 2 hours",
        "description": "A mini-bus with air conditioning and a TV. Make 2 stops at supermarkets along the way."
      }
    },
    {
      "type": "routes",
      "id": "15",
      "attributes": {
        "from-address": "Charles De Gaulle, Krong Siem Reap, Cambodia",
        "from-city": "Krong Siem Reap, Cambodia",
        "from-lat": 13.390955550051162,
        "from-lng": 103.86543273925781,
        "to-address": "Road B2, Phnom Penh, Cambodia",
        "to-city": "Phnom Penh, Cambodia",
        "to-lat": 11.602299185228874,
        "to-lng": 104.90861892700195,
        "organization": "Cambodia Bus Line",
        "company-mail": "info@cambodiabusline.com",
        "company-phone": "+77 888 999 5454",
        "company-site": "http://cambodiabusline.com",
        "company-description": "Oldest bus company in Cambodia, operating since 1985.",
        "transport-type": "Bus",
        "duration": 5.5,
        "price": 20,
        "timetable": "7:00 AM on weekdays",
        "description": "Large comfortable bus with tea/coffee and cookies available throughout the trip."
      }
    }
  ]
});
