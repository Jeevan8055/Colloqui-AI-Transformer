import PropTypes from 'prop-types';
import { MdComputer, MdPerson, MdContentCopy, MdPictureAsPdf } from 'react-icons/md';
import moment from 'moment';
// eslint-disable-next-line no-unused-vars
import React, { useRef, useState } from 'react';
import Image from './Image';
import Markdown from './Markdown';
import ReactToPrint from 'react-to-print';

const Message = (props) => {
  const { id, createdAt, text, ai = false, selected } = props.message;
  const [copied, setCopied] = useState(false);
  const componentRef = useRef();

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      key={id}
      className={`flex items-end my-2 gap-2 ${ai ? 'flex-row-reverse justify-end' : 'flex-row justify-end'
        }`}>
      {selected === 'DALL·E' && ai ? (
        <Image url={text} />
      ) : (
        <div
          ref={componentRef}
          className={`w-screen overflow-hidden chat ${ai ? 'chat-start' : 'chat-end'}`}>
          <div className='chat-bubble text-neutral-content'>
            <Markdown markdownText={text} />
            <div className={`${ai ? 'text-left' : 'text-right'} text-xs flex items-center`}>
              <span onClick={handleCopy} className="cursor-pointer">
                {copied ? (
                  <span>&#10003;</span>
                ) : (
                  <MdContentCopy className="inline-block align-text-bottom text-xl mr-2 cursor-pointer" />
                )}
              </span>
              <ReactToPrint
                trigger={() => (
                  <MdPictureAsPdf className="inline-block align-text-bottom text-xl cursor-pointer" />
                )}
                content={() => componentRef.current}
                bodyClass="print-body"
              />
              <span className="ml-2"> {/* To add some space between icons and timestamp */}
                {moment(createdAt).calendar()}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className='avatar'>
        <div className='w-8 border rounded-full border-slate-400'>
          {ai ? (
            <MdComputer className='w-6 h-full m-auto' />
          ) : (
            <MdPerson className='w-6 h-full m-auto' />
          )}
        </div>
      </div>
    </div>
  );
};

export default Message;

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    createdAt: PropTypes.number.isRequired,
    text: PropTypes.string,
    ai: PropTypes.bool,
    selected: PropTypes.string,
  }).isRequired,
};
