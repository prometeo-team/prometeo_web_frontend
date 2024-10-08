import { useEffect, useState } from 'react';
import classNames from 'classnames';
import './CardGraficsComponent.css';
import { FaFile } from "react-icons/fa6";
import { CiUser } from "react-icons/ci";
import { MdCheckCircleOutline } from "react-icons/md";
import Chart from 'chart.js/auto';

function CardGraficsComponent({ type, number, grafico, data, chartRef }) {
    const [datagrafics, setDatagrafics] = useState([]);

    useEffect(() => {
        setDatagrafics(data);
    }, [data]);

    useEffect(() => {
        if (datagrafics.length > 0) {
            if (chartRef.current) {
                chartRef.current.destroy(); // Destruye el gráfico anterior si existe
            }
            grafics();
        }
    }, [datagrafics]);

    const grafics = () => {
        const ctx = document.getElementById(grafico).getContext('2d');
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: datagrafics.map(row => row.date),
                datasets: [{
                    label: 'Acquisitions by date',
                    data: datagrafics.map(row => row.count),
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                    tension: 0
                }]
            },
            options: {
                plugins: {
                    legend: {
                        display: false // Oculta la leyenda
                    }
                },
                scales: {
                    x: {
                        display: false // Oculta las etiquetas del eje x
                    },
                    y: {
                        display: false // Oculta las etiquetas del eje y
                    }
                }
            }
        });
    };

    let card = null;

    if (type === '1') {
        card = <span className={classNames('flex max-md:flex-col-reverse text-balance')}><FaFile />Solicitudes pendientes</span>;
    } else if (type === '2') {
        card = <span className={classNames('flex max-md:flex-col-reverse text-balance')}><CiUser />Solicitudes en proceso</span>;
    } else if (type === '3') {
        card = <span className={classNames('flex max-md:flex-col-reverse text-balance')}><MdCheckCircleOutline />Solicitudes finalizadas</span>;
    }

    return (
        <>
            <div className={classNames('w-1/3 h-full bg-white letter rounded-2xl cursor-pointer p-3 m-1 flex flex-col')}>
                <div className={classNames('w-full float-left')}>
                    {card}
                </div>
                <div className={classNames('w-full float-left')}>
                    <span>{number}</span>
                </div>
                <div className={classNames('w-full')}><canvas id={grafico}></canvas></div>
            </div>
        </>
    );
}

export default CardGraficsComponent;
