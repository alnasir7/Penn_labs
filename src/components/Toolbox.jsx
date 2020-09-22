import React, {useState} from 'react';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fade, makeStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {uploadToolbox} from "../Actions/Actions"
import { Collapse } from '@material-ui/core';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


//This is the component where all the search and filter data are set

//create styles for Material UI components
const useStyles = makeStyles((theme) => ({
search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      
      width: 'auto',
    },
  },searchIcon: {
    padding: theme.spacing(0, 2),
    paddingLeft: 0,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));


const Toolbox = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [searchString, changeSearchString] = useState("");
    const [expanded, setExpanded] = useState (false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
      };
      const [expanded2, setExpanded2] = useState (false);
    const handleExpandClick2 = () => {
        setExpanded2(!expanded2);
      };

    const [prereqs, changePrereqs] = useState([]);
    const [dept, changeDept] = useState([]);
    const handleSearch = (e) => {
     changeSearchString(e.target.value);
    }
    const departments = ["CIS", "PHY", "MATH", "ECON"];
    const prereqsList = ["0"," 1","2", "3"]

    const [toolboxData, changeData] = useState ({});

    const handleCheckChange = (e) => {
        if (dept.includes(e.target.value)) {
            changeDept(dept.filter((item)=> !(item==e.target.value) ));
        }
        else{
            let newArray = [...dept];
            newArray.push(e.target.value);
            changeDept(newArray);
        }
        
    }

    const handlePrereqChange = (e) => {
        if (prereqs.includes(e.target.value)) {
            changePrereqs(prereqs.filter((item)=> !(item==e.target.value) ));
        }
        else{
            let newArray = [...prereqs];
            newArray.push(e.target.value);
            changePrereqs(newArray);
        }
        
    }

    useEffect (()=>{
        dispatch ({type : uploadToolbox, payload:{searchString: searchString || "" , dept : dept || [], prereqs: prereqs || "" } })
    },[searchString, dept, prereqs])

    return ( 
        <div style={{position:"fixed"}}>
            <ul className="list-group list-group-flush">
  <li className="list-group-item">
  <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              onChange = {handleSearch}
              value = {searchString}
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
  </li>
  <li className="list-group-item">
  Departments
       <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
         <ExpandMoreIcon />
        </IconButton>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
    <div class="form-check">
      {  departments.map((dept => {return (
    <div><input class="form-check-input" type="checkbox" value={dept} id={dept} onChange = {handleCheckChange} />
  <label class="form-check-label" for="Check1">
    {dept}
  </label></div>);})) }
 
</div>

    </Collapse>
  </li>



  <li className="list-group-item">
  prerequisites
       <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded2,
          })}
          onClick={handleExpandClick2}
          aria-expanded={expanded2}
          aria-label="show more"
        >
         <ExpandMoreIcon />
        </IconButton>
    <Collapse in={expanded2} timeout="auto" unmountOnExit>
    <div class="form-check">
      {  prereqsList.map((item => {return (
    <div><input class="form-check-input" type="checkbox" value={item} id={item} onChange = {handlePrereqChange} />
  <label class="form-check-label" for="Check1">
    {item} {item == 0 ? null : <span> Or less</span> }
  </label></div>);})) }
 
</div>

    </Collapse>
  </li>

</ul>
        </div>
     );
}
 
export default Toolbox;