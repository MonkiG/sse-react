import { useEffect, useState } from 'react';
import {API_URL} from './../config'
import {EventSourcePolyfill} from 'event-source-polyfill'

export default function AdminPage() {
    const [productosComprados, setProductosComprados] = useState([]);

    useEffect(() => {
        const sse = new EventSourcePolyfill(`${API_URL}/sells`, {headers: {'Authorization': 'Bearer tokenlakjshdfaksdfj'}})

        sse.onmessage = (event) => {
            const product = JSON.parse(event.data)
            setProductosComprados(prev => ([...prev, product]))
        }

        return () => {
            sse.close()
        }

    }, [])
    
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', color: '#333' }}>Admin Page</h2>
            <div style={{ marginTop: '20px' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>ID</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Nombre</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Categoría</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px' }}>Precio</th>
                               
                            </tr>
                        </thead>
                        <tbody>
                            { productosComprados.length > 0 ? productosComprados.map((producto, i) => (
                                <tr key={`${producto.id}-${i}`}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>{producto.id}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.nombre}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>{producto.categoria}</td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'right' }}>${producto.precio.toFixed(2)}</td>
                                </tr>
                            )) : <tr style={{ textAlign: 'center', color: '#666' }}>
                                <td colSpan={4}>No products</td>
                                </tr>}
                        </tbody>
                    </table>
            </div>
        </div>
    );
}
