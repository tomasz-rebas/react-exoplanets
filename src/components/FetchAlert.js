import React from 'react';

export default function FetchAlert( { didFetchFail } ) {
    return (
        <div>
            {
                didFetchFail ?
                <p>Error occured when fetching data. Please reload and try again.</p> :
                <p>Fetching data. Please wait...</p>
            }
        </div>
    );
}