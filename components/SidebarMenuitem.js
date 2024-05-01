export default function SidebarMenuitem({text, Icon, active}) {
  return (
    <div className='hoverEffect flex items-center text-gray-900 xl:justify-start text-lg xl:space-x-2'>
        <Icon className="h-7 ml-1.5"/>
        <span className={`${active && "font-bold"} hidden xl:inline`} >{text}</span>
    </div>
  )
}
