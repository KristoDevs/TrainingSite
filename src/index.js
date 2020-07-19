'use strict';

import './sass/reset.scss';
import './sass/main.scss';
import './sass/variables.scss';

const header = document.querySelector('.header-area');
const logo = document.querySelector('.company-logo');
const stickyThis = document.querySelector('.programs');
const navItems = document.querySelectorAll('.scroll-to-section > a');
const menuButton = document.querySelector('.menu-button');
const navigation = document.querySelector('.navigation-items');
const trainingClasses = document.querySelectorAll('.training-class');
const filterItems = document.querySelectorAll('.filter-item');

let scheduleFitnessAM = document.querySelector('.fitnessAM');
let scheduleFitnessPM = document.querySelector('.fitnessPM');
let scheduleMuscleAM = document.querySelector('.muscleAM');
let scheduleMusclePM = document.querySelector('.musclePM');
let scheduleBodyAM = document.querySelector('.bodybuildingAM');
let scheduleBodyPM = document.querySelector('.bodybuildingPM');
let scheduleYogaAM = document.querySelector('.yogaAM');
let scheduleYogaPM = document.querySelector('.yogaPM');
let scheduleAdvancedAM = document.querySelector('.advancedAM');
let scheduleAdvancedPM = document.querySelector('.advancedPM');
let selectAllSchedules = document.querySelectorAll('.schedule-items');

let menuOpen = false;

let trainingSchedules = {
  monday: {
    FitnessClass: '10:00AM - 11:30AM',
    BodyBuilding: '2:00PM - 3:30PM',
  },
  tuesday: {
    FitnessClass: '2:00PM - 3:30PM',
    BodyBuilding: '10:00AM - 11:30AM',
  },
  wednesday: {
    YogaTrainingClass: '10:00AM - 11:30AM',
    AdvancedTraining: '2:00PM - 3:30PM',
  },
  thursday: {
    MuscleTraining: '2:00PM - 3:30PM',
    AdvancedTraining: '10:00AM - 11:30AM',
  },
  friday: {
    MuscleTraining: '10:00AM - 11:30AM',
    YogaTrainingClass: '2:00PM - 3:30PM',
  },
};

scheduleFitnessAM.innerHTML = trainingSchedules.monday.FitnessClass;
scheduleBodyPM.innerHTML = trainingSchedules.monday.BodyBuilding;

menuButton.addEventListener('click', () => {
  if (!menuOpen) {
    navigation.style.cssText = 'display: block !important';
    menuButton.classList.add('open');
    menuOpen = true;
  } else {
    navigation.style.cssText = 'display: none !important';
    menuButton.classList.remove('open');
    menuOpen = false;
  }
});

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;
  const stickyPoint = stickyThis.offsetTop - window.scrollY;

  if (currentScroll > stickyPoint) {
    header.classList.add('sticky');
    logo.classList.add('darken-logo');
    navItems.forEach((item) => {
      item.classList.add('darken');
    });
  } else if (
    currentScroll < stickyPoint &&
    header.classList.contains('sticky')
  ) {
    header.classList.remove('sticky');
    logo.classList.remove('darken-logo');
    navItems.forEach((item) => {
      item.classList.remove('darken');
    });
  }
});

window.addEventListener('scroll', () => {
  let menuItems = document.querySelectorAll('.scroll-to-section > a');
  let sections = document.querySelectorAll('.section');
  let index = sections.length;

  while (index-- && window.scrollY + 500 < sections[index].offsetTop) {
    menuItems.forEach((item) => {
      item.classList.remove('active');
    });
    menuItems[index].classList.add('active');
  }
});

trainingClasses.forEach((button) => {
  button.addEventListener('click', () => {
    const windowSize = window.matchMedia('(max-width: 900px)');
    const tabNumber = button.dataset.forTab;
    const tabToActivate = document.querySelector(
      `.training-tab[data-tab="${tabNumber}"]`
    );

    const classToInsert = document.querySelector(
      `.training-class[data-for-tab="${tabNumber}"]`
    );

    const elements = [...tabToActivate.children];

    let trainingClass = document.createElement('div');

    document.querySelectorAll('.training-class').forEach((button) => {
      button.classList.remove('tab-active');
    });

    document.querySelectorAll('.training-tab').forEach((tab) => {
      tab.classList.remove('training-active');
    });

    button.classList.add('tab-active');
    tabToActivate.classList.add('training-active');

    if (windowSize.matches && classToInsert.children.length < 2) {
      classToInsert.appendChild(trainingClass);
      trainingClass.className = 'training-tab';
      elements.forEach((el) => {
        trainingClass.appendChild(el);
      });
    }

    classToInsert.addEventListener('click', () => {
      toggleElement(trainingClass);
    });
  });
});

filterItems.forEach((item) => {
  item.addEventListener('click', function () {
    filterItems.forEach((item) => item.classList.remove('active'));
    this.classList.add('active');
    let filterDay = item.dataset.filters;
    let keysArray = [];

    Object.entries(trainingSchedules).forEach(([key, val]) => {
      if (key === filterDay) {
        Object.keys(val).forEach((v) => {
          keysArray.push(v);
        });
      }
    });

    switch (filterDay) {
      case 'monday':
        selectAllSchedules.forEach((item) => {
          item.innerHTML = '';
        });
        scheduleFitnessAM.innerHTML =
          trainingSchedules[filterDay][keysArray[0]];
        scheduleBodyPM.innerHTML = trainingSchedules[filterDay][keysArray[1]];
        break;
      case 'tuesday':
        selectAllSchedules.forEach((item) => {
          item.innerHTML = '';
        });
        scheduleFitnessPM.innerHTML =
          trainingSchedules[filterDay][keysArray[0]];
        scheduleBodyAM.innerHTML = trainingSchedules[filterDay][keysArray[1]];
        break;
      case 'wednesday':
        selectAllSchedules.forEach((item) => {
          item.innerHTML = '';
        });
        scheduleYogaAM.innerHTML = trainingSchedules[filterDay][keysArray[0]];
        scheduleAdvancedPM.innerHTML =
          trainingSchedules[filterDay][keysArray[1]];
        break;
      case 'thursday':
        selectAllSchedules.forEach((item) => {
          item.innerHTML = '';
        });
        scheduleMusclePM.innerHTML = trainingSchedules[filterDay][keysArray[0]];
        scheduleAdvancedAM.innerHTML =
          trainingSchedules[filterDay][keysArray[1]];
        break;
      case 'friday':
        selectAllSchedules.forEach((item) => {
          item.innerHTML = '';
        });
        scheduleMuscleAM.innerHTML = trainingSchedules[filterDay][keysArray[0]];
        scheduleYogaPM.innerHTML = trainingSchedules[filterDay][keysArray[1]];
    }

    // scheduleFitnessAM.innerHTML = '';
    // scheduleFitnessPM.innerHTML = '';
    // scheduleMuscleAM.innerHTML = '';
    // scheduleMusclePM.innerHTML = '';
    // scheduleBodyAM.innerHTML = '';
    // scheduleBodyPM.innerHTML = '';
    // scheduleYogaAM.innerHTM = '';
    // scheduleYogaPM.innerHTML = '';
    // scheduleAdvancedAM.innerHTML = '';
    // scheduleAdvancedPM.innerHTML = '';
  });
});

const toggleElement = (element) => {
  if (element.style.display === 'none') {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
};
