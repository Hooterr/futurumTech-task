using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebApplication1
{
    /// <summary>
    /// Operation results for deleting/creating.. entities
    /// </summary>
    public enum OperationResults
    {
        /// <summary>
        /// Failed
        /// </summary>
        Fail,
        
        /// <summary>
        /// Succeeded
        /// </summary>
        Success,

        /// <summary>
        /// Entity was not found
        /// </summary>
        NotFound,
    }
}
