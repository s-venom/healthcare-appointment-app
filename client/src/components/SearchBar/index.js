import {Search} from 'lucide-react'

function SearchBar({searchTerm, setSearchTerm}) {
    const handleChange = e => {
        setSearchTerm(e.target.value)
    }

    return (
        <div className='relative w-full max-w-lg mx-auto'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5' />
        <input
            type='text'
            value={searchTerm}
            onChange={handleChange}
            placeholder='Search doctors, specializations, or locations...'
            className='w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all'
        />
        </div>
    )
}

export default SearchBar
