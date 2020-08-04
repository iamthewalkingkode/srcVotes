import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
import { post, numberFormat, shuffle } from '../functions';

const Dashboard = () => {
    const fields = ['president', 'vice', 'pro', 'deputee', 'school'];

    return (
        <React.Fragment>
            <div style={{ padding: 30 }}>
                <Row>
                    {fields.map(field => (
                        <Col lg={4} sm={6}>
                            <ChartComponent field={field} />
                            <p>&nbsp;</p>
                        </Col>
                    ))}
                </Row>
            </div>
        </React.Fragment>
    );
}

export default Dashboard;


const backgroundColor = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
];

const borderColor = [
    'rgba(255, 99, 132, 1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
];

const ChartComponent = props => {
    const { field } = props;
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = () => {
        setLoading(true);
        post('votes', 'counts', { field }).then(res => {
            setLoading(false);
            if (res.status === 200) {
                shuffle(borderColor);
                shuffle(backgroundColor);
                var data = res.result;
                var ctx = document.getElementById(field).getContext('2d');
                new window.Chart(ctx, {
                    type: 'pie',
                    data: {
                        labels: Object.keys(data).map((row, i) => {
                            return `${row} (${numberFormat(Object.values(data)[i])})`;
                        }),
                        datasets: [{
                            label: '# of Votes',
                            data: Object.values(data),
                            backgroundColor,
                            borderColor,
                            borderWidth: 1
                        }]
                    },
                    options: {

                    }
                });
            }
        });
    }

    return (
        <React.Fragment>
            <div className="text-center text-capitalize">
                <h3>{field} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; <small className="test-muted" style={{ cursor: 'pointer' }} onClick={getData}><small>refresh</small></small></h3>
            </div>
            <div style={{ backgroundColor: '#fff', padding: 10, borderRadius: 6 }}>
                {loading && (
                    <div className="text-center text-info"><i className="fa fa-spin fa-spinner"></i> loading...</div>
                )}

                <canvas id={field} width="400" height="400"></canvas>
            </div>
        </React.Fragment>
    );
}