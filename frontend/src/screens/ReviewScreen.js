import React, { useState, useEffect } from "react";
import {
  Button,
  Row,
  Col,
  ListGroup,
  Image,
  Card,
  ButtonGroup,
  ToggleButton,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { createEvent, removeSplice } from "../actions/fiberActions";
import { FIBER_SPLICE_CLEAR } from "../constants/fiberConstants";

function ReviewScreen() {
  const dispatch = useDispatch();

  const splicer = useSelector((state) => state.Splices);
  const { splices, error, loading } = splicer;

  useEffect(() => {}, []);

  const removeFromCartHandler = (id) => {
    dispatch(removeSplice(id));
  };

  const finishEvent = () => {
    dispatch(
      createEvent({
        splices,
      })
    );
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <div>
      <h1>Splices</h1>
      <Row>
        <Col md={12}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              {splices.length === 0 ? (
                <Message variant="info">No More Splices to Document</Message>
              ) : (
                <ListGroup variant="flush">
                  {splices.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <Row>
                        <Col md={2}>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => removeFromCartHandler(index)}
                          >
                            <i className="fas fa-trash" />
                          </Button>
                        </Col>
                        <Col>
                          <Row>
                            {item.cableid.cableid.cableDescriptor};{" "}
                            {item.cableid.tubeid} Tube; Fiber{" "}
                            {item.cableid.fiberList[0]};
                          </Row>
                          <Row>spliced to</Row>
                          <Row>
                            {item.cableid.cableid2.cableDescriptor};{" "}
                            {item.cableid.tubeid2} Tube: Fiber{" "}
                            {item.cableid.fiberList[1]}
                          </Row>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              )}
            </ListGroup.Item>
            <ListGroup.Item>
              <Row>
                <Col>
                  <Button onClick={() => finishEvent()}> Finish</Button>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </div>
  );
}

export default ReviewScreen;
