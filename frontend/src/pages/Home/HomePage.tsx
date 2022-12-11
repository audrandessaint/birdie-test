import React from "react";
import './HomePage.css';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

import BirdieLogo from '../../assets/images/birdie-logo.svg';
import MoodTimeLine from '../../components/MoodTimeLine';
import VisitList from '../../components/VisitList';
import TaskList from '../../components/TaskList';
import GeneralObservationList from '../../components/GeneralObservationList';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`homepage-tabpanel-${index}`}
      aria-labelledby={`homepage-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `homepage-tab-${index}`,
    'aria-controls': `homepage-tabpanel-${index}`,
  };
}

export default function HomePage() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <div className="home-page">
            <div className="home-page-header">
              <img src={BirdieLogo} alt="birdie logo" />
            </div>
            <Box sx={{ 
              flexGrow: 1, 
              display: 'flex', 
              height: '100%' }}>
                <Tabs 
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
                    onChange={handleChange}
                    aria-label="Vertical tabs example"
                    sx={{ borderRight: 1, borderColor: 'divider'}}
                >
                    <Tab label="Mood" {...a11yProps(0)} />
                    <Tab label="Task Completed" {...a11yProps(1)} />
                    <Tab label="General Observation" {...a11yProps(2)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                  <MoodTimeLine />
                </TabPanel>
                <TabPanel value={value} index={1}>
                  <TaskList />
                </TabPanel>
                <TabPanel value={value} index={2}>
                  <GeneralObservationList />
                </TabPanel>
            </Box>
        </div>
    )
}