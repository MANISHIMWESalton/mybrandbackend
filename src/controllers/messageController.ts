import { Request, Response } from 'express';
import MessageModel, { IMessage } from './../models/messageModal';
import sendEmail from '../middleware/emailSend';

export const addMessage = async(req: Request, res: Response): Promise<void> => {
  const { firstname, lastname, email, phone, message } = req.body;
  const newMessage: IMessage = new MessageModel({
    firstname,
    lastname,
    email,
    phone,
    message,
  });
  newMessage
    .save()
    .then(async(data: IMessage) => {
      await sendEmail("my brand message",` <div>message:<br>from: ${data.firstname} ${data.lastname} <br>message: ${data.message} <br>email: ${data.email} <br>phone: ${data.phone}</div>`)
      res.status(201).json({ message: 'Message has been sent', data });
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err.message });
    });
};

export const getMessages = (req: Request, res: Response): void => {
  MessageModel.find()
    .then((messages: IMessage[]) => {
      res.status(200).json({
        status: 'success',
        results: messages.length,
        data: {
          messages,
        },
      });
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err.message });
    });
};

export const singleMessage = (req: Request, res: Response): void => {
  const id: string = req.params.id;
  MessageModel.findById(id)
    .then((message: IMessage | null) => {
      if (!message) {
        res.status(404).json({ message: 'Message not found' });
        return;
      }
      res.status(200).json({
        status: 'success',
        data: {
          message,
        },
      });
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err.message });
    });
};

export const deleteMessage = (req: Request, res: Response): void => {
  const id: string = req.params.id;
  MessageModel.findByIdAndDelete(id)
    .then((result: IMessage | null) => {
      if (!result) {
        res.status(404).json({ message: 'Message not found' });
        return;
      }
      res.status(200).json({ message: 'Message has been deleted' });
    })
    .catch((err: Error) => {
      res.status(500).json({ error: err.message });
    });
};
