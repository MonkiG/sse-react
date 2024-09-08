import {API_URL} from './../config'

export default function ClientPage() {
    const products = [
        {
            id: 1,
            nombre: "Camiseta",
            precio: 19.99,
            categoria: "Ropa",
            enStock: true
        },
        {
            id: 2,
            nombre: "Pantalones",
            precio: 29.99,
            categoria: "Ropa",
            enStock: true
        },
        {
            id: 3,
            nombre: "Zapatos",
            precio: 49.99,
            categoria: "Calzado",
            enStock: false
        },
        {
            id: 4,
            nombre: "Gorra",
            precio: 14.99,
            categoria: "Accesorios",
            enStock: true
        }
    ];

    const handleBuyProduct = (product) => () => {
        fetch(`${API_URL}/buy`, {
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(product),
            method: 'POST'
        }).then(res => {
            if(!res.ok) {
                alert('Error doing the request')
                return
            }
            return res.json()
        }).then(data => {
            console.log(data)
        }).catch(e => {console.error(e)})
    }
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Productos owo</h2>
            <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px', gap: '20px', flexWrap: 'wrap' }}>
                {products.map(x => (
                    <div key={`${x.id}-${x.nombre}`} style={{ 
                        display: 'flex', 
                        flexDirection: 'column', 
                        border: '1px solid #ddd', 
                        borderRadius: '8px', 
                        padding: '15px', 
                        width: '200px',
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        backgroundColor: x.enStock ? '#f9f9f9' : '#f2f2f2',
                        textAlign: 'center'
                    }}>
                        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px', color: '#444' }}>{x.nombre}</h3>
                        <div style={{ fontSize: '14px', color: '#555' }}>
                            <p style={{ margin: '4px 0' }}>Categoría: {x.categoria}</p>
                            <p style={{ margin: '4px 0' }}>Precio: ${x.precio.toFixed(2)}</p>
                            <p style={{ margin: '4px 0' }}>En stock: {x.enStock ? 'Sí' : 'No'}</p>
                        </div>
                        <button 
                            onClick={handleBuyProduct(x)}
                            style={{
                                marginTop: '10px',
                                padding: '10px 15px',
                                fontSize: '14px',
                                color: '#fff',
                                backgroundColor: x.enStock ? '#28a745' : '#ccc',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: x.enStock ? 'pointer' : 'not-allowed',
                                transition: 'background-color 0.3s ease'
                            }}
                            disabled={!x.enStock}
                        >
                            {x.enStock ? 'Comprar' : 'Agotado'}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
