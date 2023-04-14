
import classes from '../styles/table.module.css'

export default function UserTable(props:any){
    const formatdata=(data:any)=>{
        const format_data=data.map((user:any)=>([user.id,
            user.firstName,
            user.lastName,
            user.email,
            user.phone,
            user.role?user.role.name:null,
            user.role?user.role.organization.name:null,
            user.role?user.role.department.name:null]))
            return format_data
    }
    const header_data=['User Id','Firstname','Lastname','Email','Phone','Role','Organization','Department']
    return(
        <div className={classes.table_responsive}>
        <table className={classes.table}>
        <thead className={classes.thead}>
            <tr className={classes.tr}>
                {header_data.map((head,ind)=><th className={classes.th} key={ind}>{head}</th>)}
            </tr>
        </thead>
        <tbody className={classes.tbody}>
            {formatdata(props.data.users.users).map((user:any,ind:any)=><tr className={classes.tr} key={ind}>{user.map((field:any,ind:any)=><td key={ind} className={classes.td}>{field}</td>)}</tr>)}
            </tbody>
                        </table>
                        </div>
    )
}
