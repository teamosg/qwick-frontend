import React from 'react'
import exploreStep from '../../../assets/exploreStep.png'
import { Form } from 'react-router';

const ExploreStep1 = () => {
  return (
    <>
      <div className="h-screen bg-[#9a9a9c] ">
        <Form className="flex pt-4 md:pt-6 items-center">
          <div className="">
            <img src={exploreStep} />
          </div>
          <div className="">
            <img src="" alt="" />
            <p>Prothinidi</p>
          </div>
          <h2>
            It is a long established fact that a reader will be distracted by
            the
          </h2>
          <p>
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of
          </p>

          <Button className="bg-[#003933]">Join</Button>
        </Form>
      </div>
    </>
  );
}

export default ExploreStep1