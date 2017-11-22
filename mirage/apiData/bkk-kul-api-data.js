export default () => ({
  "data": [
    {
      "type": "itineraries",
      "id": "0",
      "attributes": {
        "from-city": "Bangkok, Thailand",
        "to-city": "Kuala Lumpur, Malaysia",
        "price": 35,
        "duration": 23
      },
      "relationships": {
        "routes": {
          "data": [
            {
              "type": "routes",
              "id": "0"
            }
          ]
        }
      }
    },
    {
      "type": "itineraries",
      "id": "1",
      "attributes": {
        "from-city": "Bangkok, Thailand",
        "to-city": "Kuala Lumpur, Malaysia",
        "price": 105,
        "duration": 48.5
      },
      "relationships": {
        "routes": {
          "data": [
            {
              "type": "routes",
              "id": "1"
            }
          ]
        }
      }
    },
    {
      "type": "itineraries",
      "id": "2",
      "attributes": {
        "from-city": "Bangkok, Thailand",
        "to-city": "Kuala Lumpur, Malaysia",
        "price": 45,
        "duration": 12
      },
      "relationships": {
        "routes": {
          "data": [
            {
              "type": "routes",
              "id": "2"
            }
          ]
        }
      }
    },
    {
      "type": "itineraries",
      "id": "3-4",
      "attributes": {
        "from-city": "Bangkok, Thailand",
        "to-city": "Kuala Lumpur, Malaysia",
        "price": 40,
        "duration": 13.25
      },
      "relationships": {
        "routes": {
          "data": [
            {
              "type": "routes",
              "id": "3"
            },
            {
              "type": "routes",
              "id": "4"
            }
          ]
        }
      }
    },
    {
      "type": "itineraries",
      "id": "5-6-7",
      "attributes": {
        "from-city": "Bangkok, Thailand",
        "to-city": "Kuala Lumpur, Malaysia",
        "price": 33,
        "duration": 12.25
      },
      "relationships": {
        "routes": {
          "data": [
            {
              "type": "routes",
              "id": "5"
            },
            {
              "type": "routes",
              "id": "6"
            },
            {
              "type": "routes",
              "id": "7"
            }
          ]
        }
      }
    }
  ],
  "included": [
    {
      "type": "routes",
      "id": "0",
      "attributes": {
        "from-address": "5 Soi Sukhumvit 93, 10260, Bangkok, Thailand",
        "from-city": "Bangkok, Thailand",
        "from-lat": 13.698861464214666,
        "from-lng": 100.60481071472168,
        "to-address": "3, Lorong Kuda, 50450 Kuala Lumpur, Malaysia",
        "to-city": "Kuala Lumpur, Malaysia",
        "to-lat": 3.156006586753412,
        "to-lng": 101.72065258026123,
        "organization": "Buva Bus",
        "company-mail": "support@buvabus.com",
        "company-phone": "098 888 999",
        "company-site": "http://www.buvabus.com/",
        "company-description": "New service that has been available since the end of September, 2016, operated by the same company as (the much maligned) Virak Buntham buses.",
        "transport-type": "Bus",
        "duration": 23,
        "price": 35,
        "timetable": "7:00 AM, 6:00 PM",
        "description": "Large comfortable bus with tea/coffee and cookies available throughout the trip."
      }
    },
    {
      "type": "routes",
      "id": "1",
      "attributes": {
        "from-address": "Sai 1/1 Rd, Tambon Bang Pu Mai, 10280, Bangkok, Thailand",
        "from-city": "Bangkok, Thailand",
        "from-lat": 13.518338391990902,
        "from-lng": 100.6512451171875,
        "to-address": "Jalan Kem, Kawasan 13, 42000 Kuala Lumpur, Malaysia",
        "to-city": "Kuala Lumpur, Malaysia",
        "to-lat": 3.0006415608696684,
        "to-lng": 101.39694213867188,
        "organization": "Speed Ferry Thailand",
        "company-mail": "",
        "company-phone": "+66 88 555 880",
        "company-site": "http://speedferrythailand.com/",
        "company-description": "One of the fastest and best boat service between Thailand and Malaysia",
        "transport-type": "Ferry",
        "duration": 48.5,
        "price": 105,
        "timetable": "6:00 AM every Sunday",
        "description": "A comfortable ferry with large cabins, a great restaurant and all the amenities."
      }
    },
    {
      "type": "routes",
      "id": "2",
      "attributes": {
        "from-address": "24/6 Thanon Borommaratchachonnani, 10170, Bangkok, Thailand",
        "from-city": "Bangkok, Thailand",
        "from-lat": 13.780401863217657,
        "from-lng": 100.42259216308594,
        "to-address": "39, Taman Segambut, 51200, Kuala Lumpur, Malaysia",
        "to-city": "Kuala Lumpur, Malaysia",
        "to-lat": 3.184051699641772,
        "to-lng": 101.67709350585938,
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
      "id": "3",
      "attributes": {
        "from-address": "28 Sukhumvit Rd, 10270, Bangkok, Thailand",
        "from-city": "Bangkok, Thailand",
        "from-lat": 13.612621315962613,
        "from-lng": 100.59356689453125,
        "to-address": "29 Tongsai Rd, 84320, Ko Samui, Thailand",
        "to-city": "Ko Samui, Thailand",
        "to-lat": 9.572652095654018,
        "to-lng": 100.06656646728516,
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
      "id": "4",
      "attributes": {
        "from-address": "12 Bond Kai Rd, 84320, Ko Samui, Thailand",
        "from-city": "Ko Samui, Thailand",
        "from-lat": 9.541039251907682,
        "from-lng": 100.05227565765381,
        "to-address": "89, Jalan Raja Muda Abdul Aziz, 50300, Kuala Lumpur, Malaysia",
        "to-city": "Kuala Lumpur, Malaysia",
        "to-lat": 3.168111713439933,
        "to-lng": 101.70249938964844,
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
      "id": "5",
      "attributes": {
        "from-address": "24/6 Thanon Borommaratchachonnani, 10170, Bangkok, Thailand",
        "from-city": "Bangkok, Thailand",
        "from-lat": 13.780401863217657,
        "from-lng": 100.42259216308594,
        "to-address": "Soi Talad Mai 37, 84000, Surat Thani, Thailand",
        "to-city": "Surat Thani, Thailand",
        "to-lat": 9.145486056167277,
        "to-lng": 99.33185577392578,
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
      "id": "6",
      "attributes": {
        "from-address": "11 Soi Trianuson, 84000, Surat Thani, Thailand",
        "from-city": "Surat Thani, Thailand",
        "from-lat": 9.141588013069674,
        "from-lng": 99.33005332946777,
        "to-address": "313 Supasarnrangsan Rd, 90110, Hat Yai, Thailand",
        "to-city": "Hat Yai, Thailand",
        "to-lat": 7.008897351515131,
        "to-lng": 100.48044204711914,
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
      "id": "7",
      "attributes": {
        "from-address": "55 Rajyindee Rd, 90110, Hat Yai, Thailand",
        "from-city": "Hat Yai, Thailand",
        "from-lat": 7.004467487168602,
        "from-lng": 100.48069953918457,
        "to-address": "32, Jalan Raja Bot, Kuala Lumpur, Malaysia",
        "to-city": "Kuala Lumpur, Malaysia",
        "to-lat": 3.1651979259496397,
        "to-lng": 101.7000961303711,
        "organization": "Malaysia Bus Line",
        "company-mail": "info@malaybusline.com",
        "company-phone": "+77 888 999 5454",
        "company-site": "http://malaybusline.com",
        "company-description": "Oldest bus company in Malaysia, operating since 1985.",
        "transport-type": "Bus",
        "duration": 5.5,
        "price": 20,
        "timetable": "7:00 AM on weekdays",
        "description": "Large comfortable bus with tea/coffee and cookies available throughout the trip."
      }
    }
  ]
});
