import React from 'react';
import Heading from '../../../Components/Heading/Heading';

const FaqList = () => {
  return (
    <section className='my-7'>
      <Heading heading={'Frequently Asked Questions ?'}></Heading>

      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" defaultChecked />
        <div className="collapse-title text-xl font-medium text-blue-600">What is online group study?</div>
        <div className="collapse-content">
          <p>Online group study is a method of studying where students collaborate and learn together through online platforms.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium text-blue-600">How can I join an online study group?</div>
        <div className="collapse-content">
          <p>You can join an online study group by signing up on educational websites, forums, or using social media platforms to connect with other students.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium text-blue-600">What are the benefits of online group study?</div>
        <div className="collapse-content">
          <p>Online group study offers flexibility, access to diverse perspectives, and the ability to collaborate with peers from different locations.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium text-blue-600">What tools are needed for online group study?</div>
        <div className="collapse-content">
          <p>Online group study offers flexibility, access to diverse perspectives, and the ability to collaborate with peers from different locations.</p>
        </div>
      </div>
      <div className="collapse collapse-arrow bg-base-200">
        <input type="radio" name="my-accordion-2" />
        <div className="collapse-title text-xl font-medium text-blue-600">How can I stay focused during online group study sessions?</div>
        <div className="collapse-content">
          <p>Set clear goals, minimize distractions, and take regular breaks to stay focused during online group study sessions.</p>
        </div>
      </div>
    </section>
  );
};

export default FaqList;