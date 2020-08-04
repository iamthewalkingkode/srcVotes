export const url = 'https://restapi.anchoratechs.com/srcvotes/';

export const post = async (request, kase = '', data = {}) => {
    try {
        let response = await fetch(`${url}?request=${request}&case=${kase}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        return { status: 606, result: 'Network request failed', error: error };
    }
}

export const numberFormat = (number, minimumFractionDigits = 0) => {
    return new Intl.NumberFormat('en-IN', { minimumFractionDigits }).format(number);
}

export const shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
}