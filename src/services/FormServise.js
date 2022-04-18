

const useFormService = async () => {

    const setData = async (values) => {
        return await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
            })
            .then(response => response.json())
            .then(json => console.log(json))

    }

    
    return {setData};
   
}

export default useFormService;