"use client"
import React, {useEffect, useState} from 'react';
import NextStoreLocator from "next-store-locator-test";
import 'next-store-locator-test/dist/style.css'; // Import the CSS here

const mapOptions = {
    center: { lat: 40.7128, lng: -74.0060 },
    zoom: 10,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: false,
    styles: [
        {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
        },
    ],
};

const Page = () => {
    const [locations, setLocations] = useState([]);

    useEffect(() => {
        const fetchLocations = async () => {
            const response = await fetch('https://www.milestone.de/api/getstorelocatorlist');
            return await response.json()
        }

        fetchLocations().then(data => {
            console.log(data);
            setLocations(data);
        })
    }, []);


    return(
      <main className="w-full pt-8">
          <div className="w-full inline-flex justify-center pb-8">
              <h1 className="text-3xl font-bold">Next Store Locator</h1>
          </div>
          <div className="border-2 border-gray-100">
          { locations.length > 0 ? <NextStoreLocator locationsProp={locations}
                                                     mapOptionsProp={mapOptions}
                                                     iconPaths={{ markerIcon: 'images/custom-marker.png'}}
                                                     apiKey={"AIzaSyDq8bFTInPfWKkXymlJridxMQzT_ltjsDo"} /> : null}
          </div>
      </main>
    );
};

export default Page;
