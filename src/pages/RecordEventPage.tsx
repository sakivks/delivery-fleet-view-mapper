import React, { useState } from "react";
import { EventService } from "@/services/eventService";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";

const RecordEventPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: { eventName: string }) => {
    try {
      setLoading(true);
      const currentTime = new Date();
      await EventService.recordActualEvent(values.eventName, currentTime);
      message.success("Event recorded successfully!");
      form.resetFields();
    } catch (error) {
      console.error("Error recording event:", error);
      message.error("Failed to record event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Record Actual Event</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="space-y-4"
      >
        <Form.Item
          name="eventName"
          label="Event Name"
          rules={[{ required: true, message: "Please enter the event name" }]}
        >
          <Input placeholder="Enter event name" />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="w-full"
          >
            Record Event
          </Button>
        </Form.Item>

        <Button type="default" onClick={() => navigate("/")} className="w-full">
          Back to Home
        </Button>
      </Form>
    </div>
  );
};

export default RecordEventPage;
