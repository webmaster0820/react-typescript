import * as React from 'react'
import { useState, useEffect } from 'react'
import styled, { css } from 'styled-components'
interface RootProps {
  isToday?: boolean
  isSelected?: boolean
}

const Frame = styled.div`
  display: grid;
  grid-template-rows: 50px auto;
  background-color: #fff;
  border: 1px solid #d1e3f8;
  box-sizing: border-box;
  box-shadow: 0px 4px 8px rgba(50, 73, 100, 0.1);
`

const Header = styled.div`
  font-size: 18px;
  font-weight: bold;
  height: 50px;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-bottom: 1px solid #d1e3f8;

  svg {
    cursor: pointer;
  }
`

const Body = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-template-rows: repeat(7, 1fr);
  box-sizing: border-box;
  padding: 10px 20px 20px 20px;
`

const WeekDay = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 14px;
  color: #6b85a3;
`

const BlockDay = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  color: #6b85a3;
`

const Day = styled['div']`
  position: relative;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  color: #1A2533;

  .today {
    display: inline-block;
    position: absolute;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: transparent;
    top: 30px;
    right: 17px;
    left: 17px;
  }

  &:hover {
    background-color: #e8f1fb;
  }

  ${(props: RootProps) =>
    props.isToday &&
    css`
      .today {
        background-color: #4991e5;
      }
    `}

  ${(props: RootProps) =>
    props.isSelected &&
    css`
      color: white;
      background-color: #1b76de;
      &:hover {
        background-color: #1b76de;
      }
    `}
  ${(props: RootProps) =>
    props.isToday &&
    props.isSelected &&
    css`
      .today {
        background-color: #fff;
      }
    `}
`

export function Calendar() {
  const DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const DAYS_LEAP = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const DAYS_OF_THE_WEEK = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
  const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  const today = new Date()
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [date, setDate] = useState(today)
  const [day, setDay] = useState(date.getDate())
  const [month, setMonth] = useState(date.getMonth())
  const [year, setYear] = useState(date.getFullYear())
  const [startDay, setStartDay] = useState(getStartDayOfMonth(date))

  useEffect(() => {
    setDay(date.getDate())
    setMonth(date.getMonth())
    setYear(date.getFullYear())
    setStartDay(getStartDayOfMonth(date))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date])

  function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
  }

  function getStartDayOfMonth(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const days = isLeapYear ? DAYS_LEAP : DAYS

  return (
    <Frame>
      <Header>
        <svg
          onClick={() => setDate(new Date(year, month - 1, day))}
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6 8.93248C6 9.3564 5.50557 9.58798 5.17991 9.31659L0.460931 5.38411C0.221054 5.18421 0.221055 4.81579 0.460932 4.61589L5.17991 0.68341C5.50557 0.412024 6 0.643603 6 1.06752L6 8.93248Z"
            fill="#0A2B52"
          />
        </svg>
        <div>
          {MONTHS[month]} {year}
        </div>
        <svg
          onClick={() => setDate(new Date(year, month + 1, day))}
          width="6"
          height="10"
          viewBox="0 0 6 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M7.80902e-07 1.06752C8.17962e-07 0.643602 0.494429 0.412023 0.820093 0.683409L5.53907 4.61589C5.77895 4.81579 5.77894 5.18421 5.53907 5.38411L0.820091 9.31659C0.494428 9.58798 5.62655e-08 9.3564 9.33256e-08 8.93248L7.80902e-07 1.06752Z"
            fill="#0A2B52"
          />
        </svg>
      </Header>
      <Body>
        {DAYS_OF_THE_WEEK.map((d) => (
          <WeekDay key={d}>{d}</WeekDay>
        ))}
        {Array((startDay + 6) % 7)
          .fill(null)
          .map((_, index) => {
            const blockDays = (startDay + 6) % 7
            return (
              <BlockDay key={index}>
                {days[(month + 11) % 12] - blockDays + 1 + index}
              </BlockDay>
            )
          })}
        {Array(days[month])
          .fill(null)
          .map((_, index) => {
            const d = index + 1
            return (
              <Day
                key={index}
                isToday={
                  d === today.getDate() &&
                  year === today.getFullYear() &&
                  month === today.getMonth()
                }
                isSelected={
                  d === selectedDate.getDate() &&
                  year === selectedDate.getUTCFullYear() &&
                  month === selectedDate.getMonth()
                }
                onClick={() => setSelectedDate(new Date(year, month, d))}
              >
                {d > 0 ? d : ''}
                <span className="today"></span>
              </Day>
            )
          })}
        {Array(42 - ((startDay + 6) % 7) - days[month])
          .fill(null)
          .map((_, index) => {
            return <BlockDay key={index}>{index + 1}</BlockDay>
          })}
      </Body>
    </Frame>
  )
}
