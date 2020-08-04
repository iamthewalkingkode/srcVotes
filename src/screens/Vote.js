import React, { useState } from 'react';
import { Form, Input, Radio, Button, notification } from 'antd';
import { FormGroup, Row, Col } from 'reactstrap';
import { post } from '../functions';

const Vote = () => {
    const [form] = Form.useForm();

    const radioStyle = {
        display: 'block',
        height: '30px',
        lineHeight: '30px',
    };

    const pros = ['Abigail', 'Royal', 'None of them'];
    const schools = ['GH Cosmetology', 'GH Media', 'GH Nursing', 'None of them'];
    const deputees = ['Perez', 'No'];
    const presidents = ['Mawuli', 'Erica', 'None of them'];
    const vicePresidents = ['Naa Adokor', 'Gifty Quist', 'Oyibo Fiifi', 'None of them'];

    const stepChecks = [
        [],
        ['index'],
        ['index', 'president'],
        ['index', 'president', 'vice'],
        ['index', 'president', 'vice', 'pro'],
        ['index', 'president', 'vice', 'pro', 'deputee'],
        ['index', 'president', 'vice', 'pro', 'deputee', 'school'],
    ];

    const [step, setStep] = useState(0);
    const [submitting, setSubmitting] = useState(false);

    const _submit = e => {
        e.preventDefault();
        form.validateFields(stepChecks[step]).then(v => {
            _submitGo(v);
        }).catch(errors => {
            if (errors.errorFields.length === 0) {
                _submitGo(errors.values);
            }
        });
    }

    const _submitGo = (v) => {
        if (step === 6) {
            setSubmitting(true);
            v['index'] = `GHMS ${v.index}`;
            post('votes', 'create', v).then(res => {
                setSubmitting(false);
                if (res.status === 200) {
                    setStep(0);
                    form.resetFields();
                    notification.success({ message: res.result });
                } else {
                    notification.error({ message: res.result });
                }
            })
        } else {
            setStep(step + 1);
        }
    }

    const goBack = () => {
        setStep(step - 1);
    }

    return (
        <React.Fragment>
            <Row>
                <Col lg={5} sm={9} className="voting-container">
                    <div>
                        <div className="text-center">
                            <img src="assets/img/logo.jpg" alt="logo" height="140px" />
                        </div>

                        <div className="form">
                            <Form meth="POST" action="#" form={form} layout="vertical">
                                <h2 className="text-center"><b>Elections of GH Schools Executives</b></h2>
                                <p>&nbsp;</p>

                                <div hidden={step !== 0}>
                                    <div className="text-center">
                                        <p>The Following is a proposal for the online voting procedure for the upcoming 2020 election of GH Schools' Executives</p>
                                        <hr />
                                    </div>
                                    <p>&nbsp;</p>

                                    <p>- A voter should be a registered student for their votes to be considered</p>
                                    <p>- After validating your votes, you'll see a "THANK YOU" Message as confirmation</p>
                                    <p>- Voting differently more than once will nullify your vote.</p>
                                    <p>NB: For trial purposes, shortly after your vote, we'll let you know who you voted for through the contact you've provided.</p>
                                    <p>&nbsp;</p>
                                </div>

                                <Row hidden={step !== 1}>
                                    <Col lg={5} sm={5}>
                                        {/* <FormGroup>
                                    <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                                        <Input type="text" size="large" disabled={submitting} />
                                    </Form.Item>
                                </FormGroup> */}
                                        <FormGroup>
                                            <Form.Item label="Index number" name="index" rules={[{ required: true }]}>
                                                <Input addonBefore="GHMS" type="text" size="large" disabled={submitting} />
                                            </Form.Item>
                                        </FormGroup>
                                        <p>&nbsp;</p>
                                    </Col>
                                </Row>

                                <Row hidden={step !== 2}>
                                    <Col lg={12} className="text-center">
                                        <img className="img-thumbnail" src="assets/img/president.png" alt="president" />
                                    </Col>
                                    <Col lg={7}>
                                        <FormGroup tag="fieldset">
                                            <Form.Item label="Who do you vote for as President?" name="president" rules={[{ required: true }]}>
                                                <Radio.Group>
                                                    {presidents.map((president, i) => (
                                                        <Radio key={`pre-${i}`} style={radioStyle} value={president} disabled={submitting}>
                                                            {president}
                                                        </Radio>
                                                    ))}
                                                </Radio.Group>
                                            </Form.Item>
                                        </FormGroup>
                                        <p>&nbsp;</p>
                                    </Col>
                                </Row>

                                <Row hidden={step !== 3}>
                                    <Col lg={12} className="text-center">
                                        <img className="img-thumbnail" src="assets/img/vice.jpg" alt="Vice" />
                                    </Col>
                                    <Col lg={7}>
                                        <FormGroup tag="fieldset">
                                            <Form.Item label="Who do you vote for as Vice-President?" name="vice" rules={[{ required: true }]}>
                                                <Radio.Group>
                                                    {vicePresidents.map((vice, i) => (
                                                        <Radio key={`vice-${i}`} style={radioStyle} value={vice} disabled={submitting}>
                                                            {vice}
                                                        </Radio>
                                                    ))}
                                                </Radio.Group>
                                            </Form.Item>
                                        </FormGroup>
                                        <p>&nbsp;</p>
                                    </Col>
                                </Row>

                                <Row hidden={step !== 4}>
                                    <Col lg={12} className="text-center">
                                        <img className="img-thumbnail" src="assets/img/pro.png" alt="pro" />
                                    </Col>
                                    <Col lg={7}>
                                        <FormGroup tag="fieldset">
                                            <Form.Item label="Who do you vote for as P.R.O?" name="pro" rules={[{ required: true }]}>
                                                <Radio.Group>
                                                    {pros.map((pro, i) => (
                                                        <Radio key={`pro-${i}`} style={radioStyle} value={pro} disabled={submitting}>
                                                            {pro}
                                                        </Radio>
                                                    ))}
                                                </Radio.Group>
                                            </Form.Item>
                                        </FormGroup>
                                        <p>&nbsp;</p>
                                    </Col>
                                </Row>

                                <Row hidden={step !== 5}>
                                    <Col lg={12} className="text-center">
                                        <img className="img-thumbnail" src="assets/img/deputee.jpg" alt="pro" />
                                    </Col>
                                    <Col lg={7}>
                                        <FormGroup tag="fieldset">
                                            <Form.Item label="Would you recommend Perez for P.R.O Deputee ?" name="deputee" rules={[{ required: true }]}>
                                                <Radio.Group>
                                                    {deputees.map((deputee, i) => (
                                                        <Radio key={`deputee-${i}`} style={radioStyle} value={deputee} disabled={submitting}>
                                                            {deputee}
                                                        </Radio>
                                                    ))}
                                                </Radio.Group>
                                            </Form.Item>
                                        </FormGroup>
                                        <p>&nbsp;</p>
                                    </Col>
                                </Row>

                                <Row hidden={step !== 6}>
                                    <Col lg={12} className="text-center">
                                        <img className="img-thumbnail" src="assets/img/schools.png" alt="pro" />
                                    </Col>
                                    <Col lg={7}>
                                        <FormGroup tag="fieldset">
                                            <Form.Item label="What is your favorite GH School?" name="school" rules={[{ required: true }]}>
                                                <Radio.Group>
                                                    {schools.map((school, i) => (
                                                        <Radio key={`school-${i}`} style={radioStyle} value={school} disabled={submitting}>
                                                            {school}
                                                        </Radio>
                                                    ))}
                                                </Radio.Group>
                                            </Form.Item>
                                        </FormGroup>
                                        <p>&nbsp;</p>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col lg={4} sm={4} xs={6} className="text-center">
                                        {step > 1 && (
                                            <Button type="default" htmlType="submit" size="large" shape="round" block onClick={goBack}>Previous</Button>
                                        )}
                                    </Col>
                                    <Col lg={4} sm={4} className="text-center"></Col>
                                    <Col lg={4} sm={4} xs={6} className="text-center">
                                        <Button type="primary" htmlType="submit" size="large" shape="round" block loading={submitting} onClick={_submit}>{step === 6 ? 'Submit' : 'Next'}</Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </div>
                </Col>
            </Row>
        </React.Fragment>
    );
}

export default Vote;