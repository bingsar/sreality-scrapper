import s from './Properties.module.css';
import React, {useEffect, useState} from 'react';
import Header from '../Header/Header';
import PropertyItem from '../PropertyItem/PropertyItem';
import Pagination from "../Pagination/Pagination";
import { Property } from '../data/typings/Property';

const Properties = () => {
    const [properties, setProperties] = useState<Property[]>([]);
    const [propertyCount, setPropertyCount] = useState(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [scrappingIsReady, setScrappingReady] = useState(false);
    const itemsPerPage = 30;

    const propertyCountTimeout = setTimeout(() => {
        getPropertiesCount()
    }, 3000)

    function getPropertiesCount() {
        fetch('http://localhost:3001/api/propertyCount')
            .then(response => response.json())
            .then(data => setPropertyCount(data.propertyCount))
            .catch(error => console.error('Error fetching property count:', error));

        if (propertyCount >= 500) {
            clearTimeout(propertyCountTimeout)
            setScrappingReady(true)
        }
    }

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await fetch(`http://localhost:3001/api/properties?page=${currentPage}&itemsPerPage=${itemsPerPage}`);
                const data = await response.json();
                setProperties(data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };
        fetchProperties().then(() => console.log('Properties fetched'))
    }, [currentPage, itemsPerPage])

    const totalPages = Math.ceil(propertyCount / itemsPerPage);
    const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
    const indexOfLastItem = currentPage * itemsPerPage;

    return (
        <>
            <Header propertyCount={propertyCount} scrappingIsReady={scrappingIsReady}/>
            <main className={s.main}>
                {properties.map(property => (
                    <PropertyItem key={property.property_id} id={property.property_id} title={property.title} images={property.images}/>
                ))}
                <Pagination
                    setCurrentPage={setCurrentPage}
                    itemsPerPage={itemsPerPage}
                    properties={properties}
                    indexOfLastItem={indexOfLastItem}
                    propertyCount={propertyCount}
                    currentPage={currentPage}
                    pageNumbers={pageNumbers}
                />
            </main>
        </>
    );
};

export default Properties;
